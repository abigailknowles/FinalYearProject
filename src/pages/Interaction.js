import React, { } from "react";

class Interaction extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://data.police.uk/api/stops-force?force=avon-and-somerset")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true
        });
        console.log(this.state.items.length);

      })
  }
  render() {
    const { DataisLoaded } = this.state;
    if (!DataisLoaded) return <div>
      <h1> Pleses wait some time.... </h1> </div>;

    return (
      <div className="App">
        <h1> Fetch data from an api in react </h1>
        <div>Number of crimes in Cheshire: {this.state.items.length}</div>
        {/* {
          items.map((item) => (
            <ol key={item.id} >
              User_Name: {item.category},
              Full_Name: {item.name},
              User_Email: {item.email}
            </ol>
          ))
        } */}
      </div>
    );
  }
}

//   startDrag(event, draggedElem) {
//     event.preventDefault();
//     let point = this.svg.createSVGPoint();
//     point.x = event.clientX;
//     point.y = event.clientY;
//     point = point.matrixTransform(this.svg.getScreenCTM().inverse());
//     this.setState({
//       dragOffset: {
//         x: point.x - this.state.rect.x,
//         y: point.y - this.state.rect.y
//       }
//     });

//     const mousemove = (event) => {
//       event.preventDefault();
//       point.x = event.clientX;
//       point.y = event.clientY;
//       let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
//       this.setState({
//         rect: {
//           x: cursor.x - this.state.dragOffset.x,
//           y: cursor.y - this.state.dragOffset.y
//         }
//       });
//     };

//     const mouseup = (event) => {
//       document.removeEventListener("mousemove", mousemove);
//       document.removeEventListener("mouseup", mouseup);
//     };

//     document.addEventListener("mousemove", mousemove);
//     document.addEventListener("mouseup", mouseup);
//   }
// }

export default Interaction;