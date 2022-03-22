import React from 'react';
import jsPDF from 'jspdf'
class PdfGenerator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      t: "hello"
    }

  };
  generatePDF = () => {
    var doc = new jsPDF('landscape');

    doc.addFont('helvetica', 'normal')
    // doc.text(20, 60, `This is the ${this.state.t}.`)

    doc.setLineWidth(0.5);
    // long one
    // inside the long one
    doc.rect(7, 7, 75, 35);
    doc.setFontSize(26);
    doc.text(11, 24, '1027,865')
    doc.setFontSize(12);
    doc.text(12, 30, 'CRIMINALS')

    doc.rect(7, 47, 75, 35);
    doc.setFontSize(26);
    doc.text(11, 64, 'THEFT')
    doc.setFontSize(12);
    doc.text(12, 70, 'MOST COMMON CRIME')

    doc.rect(7, 87, 75, 35);
    doc.setFontSize(26);
    doc.text(11, 104, '48%')
    doc.setFontSize(12);
    doc.text(12, 111, 'PROSECUTION RATE')

    doc.rect(7, 127, 75, 35);
    doc.setFontSize(26);
    doc.text(11, 144, '345')
    doc.setFontSize(12);
    doc.text(12, 151, 'STOP AND SEARCHES')

    doc.rect(7, 167, 75, 35);
    doc.setFontSize(26);
    doc.text(11, 184, 'APRIL')
    doc.setFontSize(12);
    doc.text(12, 191, 'HIGHEST MONTH FOR CRIME')
    //top line
    doc.rect(86, 7, 100, 50);
    doc.rect(190, 7, 100, 50);
    //middle one
    doc.rect(86, 62, 115, 72);
    // middle long one
    doc.rect(205, 62, 85, 95);
    //bottom
    doc.rect(86, 140, 115, 62);
    doc.rect(205, 162, 85, 40);

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