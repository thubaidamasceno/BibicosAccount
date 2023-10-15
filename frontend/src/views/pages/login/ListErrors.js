import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              if(errors[key])
              return (
                <li key={key}>
                  {errors[key]}
                </li>
              );
              return null;
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
