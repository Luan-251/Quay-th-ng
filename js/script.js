// Danh sách phần thưởng và tỉ lệ gốc
const prizeWeights = [
    { prize: "10%", weight: 0.5 },
    { prize: "20%", weight: 0.5 },
    { prize: "30%", weight: 0.4 },
    { prize: "40%", weight: 0.3 },
    { prize: "50%", weight: 0.05 },
  ];
  
  // Tính tổng trọng số
  const totalWeight = prizeWeights.reduce((sum, item) => sum + item.weight, 0);
  
  // Danh sách phần thưởng đúng thứ tự vòng quay
  const orderedPrizes = ["10%", "20%", "30%", "40%", "50%"];
  
  let spinning = false;
  
  function startSpin() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const resultDiv = document.getElementById("result");
  
    if (!name || !phone) {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại.");
      return;
    }
  
    const phoneRegex = /^(0|\+84)\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ.");
      return;
    }
  
    if (localStorage.getItem(`spun_${phone}`)) {
      resultDiv.innerText = "Bạn đã quay thưởng rồi. Mỗi số điện thoại chỉ được 1 lần!";
      return;
    }
  
    if (spinning) return;
  
    spinning = true;
    resultDiv.innerText = "";
  
    const wheel = document.getElementById("wheel");
  
    // 🎯 Chọn phần thưởng dựa trên xác suất
    const random = Math.random() * totalWeight;
    let acc = 0;
    let selectedPrize = "10%"; // fallback
    for (let item of prizeWeights) {
      acc += item.weight;
      if (random <= acc) {
        selectedPrize = item.prize;
        break;
      }
    }
  
    // Xác định index theo thứ tự vòng quay
    const prizeIndex = orderedPrizes.indexOf(selectedPrize);
    const degree = 360 * 5 + (360 - prizeIndex * 72 - 36); // 5 vòng + căn giữa
  
    wheel.style.transform = `rotate(${degree}deg)`;
  
    setTimeout(() => {
      spinning = false;
      resultDiv.innerText = `${name} (${phone}) đã trúng voucher giảm ${selectedPrize}!`;
      localStorage.setItem(`spun_${phone}`, selectedPrize);
    }, 6200);
  }