import React, { useEffect, useState } from "react";
import InvoiceService from "services/InvoiceService";
import studentServices from "services/studentServices";
import paymentService from "services/paymentService";
import logo from "assets/img/avatars/logo.jpg";
import html2pdf from "html2pdf.js";

const BillingInformation = ({ student }) => {
  const [factureInfo, setFactureInfo] = useState(null);
  const [formationInfo, setFormationInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchDataFacture();
    fetchDataFormation();
    fetchDataPayment();
    setCurrentDate(new Date());
  }, []);

  const fetchDataFacture = async () => {
    try {
      const data = await InvoiceService.getInvoiceByStudentId(student._id);
      setFactureInfo(data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFormation = async () => {
    try {
      const data = await studentServices.getFormationByStudentId(student._id);
      setFormationInfo(data);
    } catch (error) {
      console.error("Error fetching formation:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataPayment = async () => {
    try {
      const data = await paymentService.getPaymentsByStudentId(student._id);
      setPaymentInfo(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const calculateTotalPrice = () => {
    if (formationInfo) {
      return (
        (formationInfo.registrationFee || 0) + (formationInfo.tuitionFee || 0)
      );
    }
    return 0;
  };

  const calculateRemainingBalance = () => {
    const total = calculateTotalPrice();
    const totalPayments = paymentInfo.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    return total - totalPayments;
  };

  const handleDownloadReceipt = async (paymentId) => {
    try {
      const pdfUrl = await paymentService.exportReceiptAsPDF(paymentId);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error downloading receipt:", error);
      setError(error);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("billing-information");
    // Temporarily add the hidden class to the button
    const addButton = document.getElementById("add-button");
    if (addButton) {
      addButton.classList.add("hidden");
    }

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "facture.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .finally(() => {
        // Remove the hidden class after PDF is downloaded
        if (addButton) {
          addButton.classList.remove("hidden");
        }
      });
  };



  return (
    <div className="mb-6 bg-white p-6 shadow-lg">
      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadPDF}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Télécharger en PDF
        </button>
      </div>

      <div id="billing-information">
        <div>
          <div className="flex items-center justify-between">
            <img
              className="h-30 w-32 rounded-full"
              src={logo}
              alt="Company Logo"
            />
            <div className="mt-2">
              <h1 className="text-2xl font-bold">Facture</h1>
              <h1 className="text-lg font-bold">
                {factureInfo
                  ? formatDate(factureInfo.dateCreated)
                  : "Date non disponible"}
              </h1>
            </div>
          </div>

          <div className="my-2 flex flex-col justify-between md:flex-row">
            <div className="mb-4 flex flex-col md:mb-0">
              <p className="text-lg">Horizon Formation</p>
              <p className="text-lg">13 Rue de Hollande, Tunis</p>
              <p className="text-lg">horizon.formation13@gmail.com</p>
              <p className="text-lg">+216 21 968 529</p>
            </div>

            <div className="flex flex-col text-right">
              <p className="text-lg">
                {student?.personalInfo?.lastName}{" "}
                {student?.personalInfo?.firstName}
              </p>
              <p className="text-lg">
                {student?.personalInfo?.address?.city},{" "}
                {student?.personalInfo?.address?.state}{" "}
                {student?.personalInfo?.address?.zip}
              </p>
              <p className="text-lg">{student?.personalInfo?.email}</p>
              <p className="text-lg">{student?.personalInfo?.phoneNumber}</p>
            </div>
          </div>

          <hr className="my-6"></hr>

          <div className="my-3">
            <div className="flex items-center space-x-4">
              <strong>Nom de la Formation :</strong>
              <p>{formationInfo?.name || "Non spécifié"}</p>
            </div>
            <div className="flex items-center space-x-4">
              <strong>Niveau d'étude :</strong>
              <p>{formationInfo?.level || "Non spécifié"}</p>
            </div>
            <div className="mt-3">
              <div className="flex items-center space-x-4">
                <strong>Prix de l'inscription :</strong>
                <p>{formationInfo?.registrationFee || "Non spécifié"}</p>
              </div>
              <div className="flex items-center space-x-4">
                <strong>Frais d'étude :</strong>
                <p>{formationInfo?.tuitionFee || "Non spécifié"}</p>
              </div>
            </div>
          </div>
          <hr className="my-6"></hr>
          <div className="mt-6">
            <div className="flex justify-between">
              <strong className="text-2xl">Paiements :</strong>
              <button
                id="add-button"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Ajouter
              </button>
            </div>
            <div className="my-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Montant Payé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Méthode de Paiement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Reçu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paymentInfo.map((payment) => (
                    <tr key={payment._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatDate(payment.date)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {payment.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {payment.method}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => handleDownloadReceipt(payment._id)}
                          className="text-blue-500 hover:underline"
                        >
                          Télécharger
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr className="my-8"></hr>

            <div className="mt-4">
              <strong className="text-lg">Total à payer :</strong>{" "}
              {calculateTotalPrice()}
            </div>
            <div className="mt-2">
              <strong className="text-lg">Montant payé :</strong>{" "}
              {paymentInfo.reduce((sum, payment) => sum + payment.amount, 0)}
            </div>
            <div className="mt-2">
              <strong className="text-lg">Solde restant :</strong>{" "}
              {calculateRemainingBalance()}
            </div>
          </div>

          <hr className="my-6"></hr>

          <div className="text-center mb-4">
            <strong className="text-lg">Merci pour votre confiance!</strong>
            <p className="text-md">
              Date: {currentDate.toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
