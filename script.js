// Məhsul funksiyaları
let productNameInput = document.getElementById("product-name");
let barcodeInput = document.getElementById("barcode");
let receiptArea = document.getElementById("receipt-area");
let receiptContent = "";

function processProduct() {
    let productName = productNameInput.value.trim();
    let barcode = barcodeInput.value.trim();

    if (productName !== "" || barcode !== "") {
        receiptContent += `<p>${
            productName !== "" ? productName : barcode
        }</p>`;
        receiptArea.innerHTML = receiptContent;
        productNameInput.value = "";
        barcodeInput.value = "";
    }
}

function openRefundConfirmation() {
    if (confirm("Məhsulu qaytarmaq istədiyinizə əminsiniz?")) {
        refundProduct();
    }
}

function refundProduct() {
    // Qaytarış məntiqini burada tətbiq edin
    // Məsələn: Qəbz məzmununu təmizlə və ya qaytarılan məhsulları işarələ
    receiptContent = "";
    receiptArea.innerHTML = "";
}

function printReceipt() {
    // Qəbz çap et funksiyası burada tətbiq ediləcək
    // Məsələn: Hazır məzmunu printerə göndərmək
    alert("Qəbz çap olundu.");
}

function openCalculator() {
    document.getElementById("calculator-modal").style.display = "block";
}

function closeCalculator() {
    document.getElementById("calculator-modal").style.display = "none";
}

// Kalkulyator funksiyaları
let calcDisplay = document.getElementById("calc-display");

function appendToDisplay(value) {
    // Yalnız rəqəmlər və nöqtə operatoru kalkulyatora əlavə olunsun
    if (!isNaN(value) || value === ".") {
        calcDisplay.value += value;
    } else if (value === "+" || value === "-") {
        let lastChar = calcDisplay.value.slice(-1);
        if (lastChar !== "+" && lastChar !== "-" && calcDisplay.value !== "") {
            calcDisplay.value += value;
        }
    }
}

function clearDisplay() {
    calcDisplay.value = "";
}

function calculateTotal() {
    try {
        let expression = calcDisplay.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/"); // Daxili vurğulaşdırıcını JavaScript operatoruna dəyişmək üçün
        let total = eval(expression);
        calcDisplay.value = total.toFixed(2); // 2 rəqəmli dəqiqlərlə cəmi göstər
        showTotalOnReceipt(total.toFixed(2)); // Məhsulun qiymət hissəsində göstər
        closeCalculator(); // Kalkulyatoru cəmi hesabladan sonra bağla
    } catch (error) {
        calcDisplay.value = "Səhv";
    }
}

function showTotalOnReceipt(total) {
    receiptContent += `<p><strong>Qalıq:</strong> ${total} AZN</p>`;
    receiptArea.innerHTML = receiptContent;
}

// Keyboard input handling
document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Enter") {
        calculateTotal(); // Enter düyməsində cəmi hesabla
    } else if (
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "." ||
        key === "*" ||
        key === "/"
    ) {
        appendToDisplay(key); // Rəqəm və operatorları kalkulyatora əlavə et
    } else if (key === "Backspace") {
        calcDisplay.value = calcDisplay.value.slice(0, -1); // Backspace ilə son simvolu sil
    }
});
