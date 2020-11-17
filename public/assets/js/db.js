let db;
// create budget db
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
      // create object for storing pending and add each time to be true by autoIncrement
      const db = event.target.result;
      db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
      db = event.target.result;

      // is app online then read from db
      if (navigator.onLine) {
            checkDatabase();
      }
};

function saveRecord(record) {
      // making readwrite for db transactions
      const transaction = db.transaction(["pending"], "readwrite");
      // accessing pending object store
      const store = transaction.objectStore("pending");
      // save record 
      store.add(record);
}

function checkDatabase() {
      // opening a transaction on db
      const transaction = db.transaction(["pending"], "readwrite");
      // accessing pending object store
      const store = transaction.objectStore("pending");
      // getting all records 
      const getAll = store.getAll();

      getAll.onsuccess = function () {
            if (getAll.result.length > 0) {
                  fetch("/api/transaction/bulk", {
                        method: "POST",
                        body: JSON.stringify(getAll.result),
                        headers: {
                              Accept: "application/json, text/plain, */*",
                              "Content-Type": "application/json"
                        }
                  })
                        .then(response => response.json())
                        .then(() => {
                              //open a transaction on your pending db
                              const transaction = db.transaction(["pending"], "readwrite");
                              const store = transaction.objectStore("pending");

                              store.clear();
                        });
            }
      };
}

window.addEventListener("online", checkDatabase);