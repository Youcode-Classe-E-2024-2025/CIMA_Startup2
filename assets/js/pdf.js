document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quotation-date').textContent = new Date().toLocaleDateString();
    document.getElementById('quotation-number').textContent = generateQuotationNumber();
  
    function generateQuotationNumber() {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      return `${randomNumber}`;
    }
  
    window.downloadQuotationPDF = function() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      const element = document.querySelector('.container.mx-auto');
  
      doc.html(element, {
        callback: function (doc) {
          doc.save('quotation.pdf');
        },
        x: 10,
        y: 10,
        width: 180, 
        windowWidth: 800 
      });
    };
  });
  