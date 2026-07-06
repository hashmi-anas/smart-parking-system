import jsPDF from "jspdf";
import QRCode from "qrcode";

const generateReceipt = async (booking) => {
  const doc = new jsPDF();

  // Generate QR Code
  const qrData = `
Booking ID : ${booking.bookingId}
Customer : ${booking.userName}
Vehicle : ${booking.vehicleNumber}
Slot : ${booking.slotNumber}
Date : ${booking.bookingDate}
Entry : ${booking.entryTime}
Exit : ${booking.exitTime}
`;

  const qrImage = await QRCode.toDataURL(qrData);

  // ===============================
  // Header
  // ===============================

  doc.setFillColor(25, 118, 210);
  doc.rect(0, 0, 210, 42, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SMART PARKING", 105, 18, {
    align: "center",
  });

  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Parking Booking Receipt", 105, 30, {
    align: "center",
  });

  // ===============================
  // Receipt Details
  // ===============================

  let y = 58;

  const row = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);

    doc.text(label, 20, y);

    doc.setFont("helvetica", "normal");
    doc.text(String(value || "-"), 82, y);

    y += 12;
  };

  row("Booking ID", booking.bookingId);
  row("Customer", booking.userName);
  row("Email", booking.email);
  row("Vehicle No", booking.vehicleNumber);
  row("Parking Slot", booking.slotNumber);
  row("Booking Date", booking.bookingDate);
  row("Entry Time", booking.entryTime);
  row("Exit Time", booking.exitTime);

  // ===============================
  // Status Badge
  // ===============================

  y += 5;

  doc.setFillColor(76, 175, 80);
  doc.roundedRect(20, y, 42, 10, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("CONFIRMED", 41, y + 7, {
    align: "center",
  });

  // ===============================
  // QR Code
  // ===============================

  doc.addImage(qrImage, "PNG", 145, 58, 45, 45);

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("Scan for booking details", 167, 108, {
    align: "center",
  });

  // ===============================
  // Footer Line
  // ===============================

  doc.setDrawColor(220);
  doc.line(20, 205, 190, 205);

  // Footer

  doc.setTextColor(90);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Thank you for choosing Smart Parking!",
    105,
    216,
    {
      align: "center",
    }
  );

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    105,
    223,
    {
      align: "center",
    }
  );

  doc.text(
    "Drive Safe • Visit Again",
    105,
    230,
    {
      align: "center",
    }
  );

  doc.save(
    `Booking_Receipt_${booking.bookingId}.pdf`
  );
};

export default generateReceipt;