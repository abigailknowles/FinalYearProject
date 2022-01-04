import React from 'react';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: []
    };
  }

  componentDidMount() {
    fetch("https://data.police.uk/api/crime-categories")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result,
          });
          console.log(result)

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, categories } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <ul>
          {categories.map(category => (
            <li key={category.id}>
              {category.name} {category.price}
            </li>
          ))}

        </ul>

      );
    }
  }
}
export default About