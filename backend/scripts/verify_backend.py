import urllib.request
import json
import time

BASE_URL = "http://localhost:8000"

def make_request(method, endpoint, data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, method=method)
    req.add_header('Content-Type', 'application/json')
    
    if data:
        json_data = json.dumps(data).encode('utf-8')
        req.data = json_data
        
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()
    except Exception as e:
        return 0, str(e)

def verify_crud(name, endpoint, valid_data, update_data):
    print(f"--- Verifying {name} ---")
    
    # 1. CREATE
    print(f"1. Creating {name}...")
    status, result = make_request("POST", endpoint, valid_data)
    if status != 200:
        print(f"FAILED to Create: {status} {result}")
        return False
    item_id = result.get("id")
    if not item_id:
        print(f"FAILED: No ID returned. Result: {result}")
        return False
    print(f"SUCCESS: Created with ID {item_id}")
    
    # 2. READ LIST
    print(f"2. Listing {name}s...")
    status, items = make_request("GET", endpoint)
    if status != 200 or not isinstance(items, list):
        print(f"FAILED to List: {status} {items}")
        return False
    found = any(i['_id'] == item_id for i in items)
    if not found:
        print("FAILED: Created item not found in list")
        return False
    print(f"SUCCESS: Item found in list of {len(items)}")

    # 3. READ ONE
    print(f"3. Reading Single {name}...")
    status, item = make_request("GET", f"{endpoint}{item_id}")
    if status != 200:
        print(f"FAILED to Read One: {status} {item}")
        return False
    print("SUCCESS: Read single item")

    # 4. UPDATE
    print(f"4. Updating {name}...")
    status, updated_item = make_request("PUT", f"{endpoint}{item_id}", update_data)
    if status != 200:
        print(f"FAILED to Update: {status} {updated_item}")
        return False
    # Verify update in response or fetch again? The response usually returns the updated doc or we can check a field.
    # The routers return `return_document=True` so `updated_item` should contain the changes.
    # Let's check a field if possible.
    print("SUCCESS: Updated item")

    # 5. DELETE
    print(f"5. Deleting {name}...")
    status, res = make_request("DELETE", f"{endpoint}{item_id}")
    if status != 200:
        print(f"FAILED to Delete: {status} {res}")
        return False
    print("SUCCESS: Deleted item")
    
    # Verify Deletion
    status, _ = make_request("GET", f"{endpoint}{item_id}")
    if status != 404:
        print(f"FAILED: Item still exists after delete (Status {status})")
        return False
    
    print(f"--- {name} Verified Successfully ---\n")
    return True

def main():
    print("Waiting for server to ensure it is up...")
    time.sleep(2) # Give a small buffer
    
    # DATA DEFINITIONS
    
    # Package Data
    pkg_data = {
        "name": "Test Package",
        "total_price": 500.0,
        "total_days": 3,
        "tripplan": [
            {
                "day": 1,
                "location": ["Colombo", "Negombo"],
                "image_url": "http://example.com/day1.jpg"
            }
        ]
    }
    pkg_update = pkg_data.copy()
    pkg_update["name"] = "Updated Test Package"

    # Place Data
    place_data = {
        "name": "Sigiriya",
        "description": "Ancient rock fortress",
        "image_url": "http://example.com/sigiriya.jpg",
        "location": "Matale",
        "price": 30.0,
        "category": "Historical"
    }
    place_update = place_data.copy()
    place_update["price"] = 35.0

    # Transport Data
    transport_data = {
        "mode_type": "Van",
        "image_url": "http://example.com/van.jpg",
        "number_of_seats": 10,
        "guide_name": "Kamal"
    }
    transport_update = transport_data.copy()
    transport_update["guide_name"] = "Nimal"

    # Hotel Data
    hotel_data = {
        "name": "Cinnamon Grand",
        "description": "Luxury hotel",
        "image_url": "http://example.com/hotel.jpg",
        "location": "Colombo",
        "price": 200.0,
        "category": "5 Star"
    }
    hotel_update = hotel_data.copy()
    hotel_update["price"] = 250.0

    all_passed = True
    
    try:
        # Verify Packages
        if not verify_crud("Package", "/packages/", pkg_data, pkg_update): all_passed = False
        
        # Verify Places
        if not verify_crud("Place", "/places/", place_data, place_update): all_passed = False

        # Verify Transport
        if not verify_crud("Transport", "/transport/", transport_data, transport_update): all_passed = False

        # Verify Hotels
        if not verify_crud("Hotel", "/hotels/", hotel_data, hotel_update): all_passed = False
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        all_passed = False

    if all_passed:
        print(">>> ALL TESTS PASSED <<<")
    else:
        print(">>> SOME TESTS FAILED <<<")

if __name__ == "__main__":
    main()
