import pytest

from app import SERVICES, app


@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "ok"
    assert data["storage"] in ("supabase", "memory")


def test_services(client):
    response = client.get("/api/services")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data["services"]) == len(SERVICES)
    assert data["services"][0]["name"] == "Стрижка"
    assert data["services"][0]["id"]


def test_barbers(client):
    response = client.get("/api/barbers")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data["barbers"]) == 3
    assert data["barbers"][0]["full_name"]


def test_create_booking(client):
    response = client.post(
        "/api/bookings",
        json={
            "name": "Иван",
            "phone": "+7 900 123-45-67",
            "service_id": 1,
            "barber_id": 1,
            "date": "2026-10-20",
            "time": "15:00",
        },
    )
    assert response.status_code == 201
    booking = response.get_json()["booking"]
    assert booking["client_name"] == "Иван"
    assert booking["service_id"] == 1
    assert booking["status"] == "pending"


def test_create_booking_invalid(client):
    response = client.post(
        "/api/bookings",
        json={"name": "", "phone": "abc", "service_id": 999, "date": "не дата", "time": "25:99"},
    )
    assert response.status_code == 400
    errors = response.get_json()["errors"]
    assert "name" in errors
    assert "phone" in errors
    assert "service_id" in errors
    assert "date" in errors
    assert "time" in errors


def test_create_booking_empty_body(client):
    response = client.post("/api/bookings", json={})
    assert response.status_code == 400


def test_bookings_list(client):
    client.post(
        "/api/bookings",
        json={"name": "Пётр", "phone": "+7 900 765-43-21", "service_id": 3},
    )
    response = client.get("/api/bookings")
    assert response.status_code == 200
    names = [b["client_name"] for b in response.get_json()["bookings"]]
    assert "Пётр" in names
