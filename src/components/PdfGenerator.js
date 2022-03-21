import React from 'react';
import jsPDF from 'jspdf'
class PdfGenerator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  };
  generatePDF = () => {
    var doc = new jsPDF('landscape');

    doc.addFont('helvetica', 'normal')
    // doc.text(20, 60, 'This is the second title.')
    // doc.text(20, 100, 'This is the thrid title.')
    doc.setLineWidth(2);
    doc.rect(7, 10, 150, 75);
    doc.rect(7, 100, 100, 100);

    doc.save('crime-report.pdf')
  }

  render() {
    return (
      <div>
        <button className="button-logout" onClick={this.generatePDF} type="primary">Download PDF</button>
      </div>
    );
  }
}
export default PdfGenerator;