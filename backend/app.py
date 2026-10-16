import os
import re

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    from supabase import create_client

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fallback-данные (используются, когда не заданы ключи Supabase, например в CI)
SERVICES = [
    {"id": 1, "name": "Стрижка", "description": "Классическая мужская стрижка", "price": 1800, "duration": 60},
    {"id": 2, "name": "Стрижка + борода", "description": "Стрижка и оформление бороды", "price": 2700, "duration": 90},
    {"id": 3, "name": "Борода", "description": "Форма, контуры и уход", "price": 1200, "duration": 30},
    {"id": 4, "name": "Детская стрижка", "description": "Для гостей до 12 лет", "price": 1400, "duration": 45},
]

BARBERS = [
    {"id": 1, "full_name": "Имя Фамилия", "experience": 5},
    {"id": 2, "full_name": "Имя Фамилия", "experience": 5},
    {"id": 3, "full_name": "Имя Фамилия", "experience": 5},
]

appointments = []

PHONE_PATTERN = re.compile(r"^[+0-9()\-\s]{10,20}$")
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")
TIME_PATTERN = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")


def fetch_services():
    if supabase:
        response = (
            supabase.table("services")
            .select("id,name,description,price,duration")
            .eq("is_active", True)
            .execute()
        )
        return response.data
    return SERVICES


def fetch_barbers():
    if supabase:
        response = (
            supabase.table("barbers")
            .select("id,full_name,experience,photo_url")
            .eq("is_active", True)
            .execute()
        )
        return response.data
    return BARBERS


def save_appointment(appointment):
    if supabase:
        response = supabase.table("appointments").insert(appointment).execute()
        return response.data[0]
    appointment = dict(appointment)
    appointment["id"] = len(appointments) + 1
    appointments.append(appointment)
    return appointment


def load_appointments():
    if supabase:
        response = (
            supabase.table("appointments")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    return appointments


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "storage": "supabase" if supabase else "memory"})


@app.get("/api/services")
def get_services():
    try:
        return jsonify({"services": fetch_services()})
    except Exception:
        return jsonify({"error": "Не удалось получить услуги"}), 500


@app.get("/api/barbers")
def get_barbers():
    try:
        return jsonify({"barbers": fetch_barbers()})
    except Exception:
        return jsonify({"error": "Не удалось получить барберов"}), 500


@app.get("/api/bookings")
def get_bookings():
    try:
        return jsonify({"bookings": load_appointments()})
    except Exception:
        return jsonify({"error": "Не удалось получить заявки"}), 500


@app.post("/api/bookings")
def create_booking():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    comment = str(data.get("comment", "")).strip()
    date = str(data.get("date", "")).strip()
    time = str(data.get("time", "")).strip()

    service_id = data.get("service_id")
    service_name = str(data.get("service", "")).strip()
    barber_id = data.get("barber_id")
    available_services = fetch_services()

    errors = {}
    if not name:
        errors["name"] = "Укажите имя"
    if not phone or not PHONE_PATTERN.match(phone):
        errors["phone"] = "Укажите корректный телефон"
    if date and not DATE_PATTERN.match(date):
        errors["date"] = "Некорректная дата"
    if time and not TIME_PATTERN.match(time):
        errors["time"] = "Некорректное время"

    try:
        service_id = int(service_id) if service_id not in (None, "") else None
    except (TypeError, ValueError):
        service_id = None
    if service_id is None and service_name:
        match = next((s for s in available_services if s["name"] == service_name), None)
        service_id = match["id"] if match else None
    if service_id not in [s["id"] for s in available_services]:
        errors["service_id"] = "Выберите услугу из списка"

    try:
        barber_id = int(barber_id) if barber_id else None
    except (TypeError, ValueError):
        barber_id = None

    if errors:
        return jsonify({"errors": errors}), 400

    appointment = {"client_name": name, "client_phone": phone, "service_id": service_id, "status": "pending"}
    if barber_id:
        appointment["barber_id"] = barber_id
    if date:
        appointment["appointment_date"] = date
    if time:
        appointment["appointment_time"] = time
    if comment:
        appointment["comment"] = comment

    try:
        created = save_appointment(appointment)
    except Exception:
        return jsonify({"error": "Не удалось сохранить запись"}), 500

    return jsonify({"booking": created}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
