import React from 'react';

export default class Step6 extends React.Component {
  back = e => {
    e.preventDefault();
    this.props.resetNameTotal();
    this.props.resetNamePayment();
    this.props.prevStep();
  };

  save = e => {
    e.preventDefault();
    alert("Saved");
  }

  show = input => e =>{
    e.preventDefault();
    input.names.map((list) => (
      console.log(list)
    ))
  }

  render(){ 
    const { Camera } = this.props;
    return(
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card blue-grey darken-1">
            <div className="card-action">
              <button className="btn waves-effect waves-light float-left"
                type="submit" name="action" onClick={this.back}>
                Back
                <i className="material-icons left">navigate_before</i>
              </button>
            </div>
            <div className="card-content white-text">
              <table className="highlight centered">
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Camera.names.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.name}
                      </td>
                      <td>
                        ${list.subtotal}
                      </td>
                      <td>
                        ${list.tax}
                      </td>
                      <td>
                        ${list.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick = {this.save}>
                Save
                <i className="material-icons right">save</i>
              </button>
              {/* <hr/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.show(Camera)}>
                Show
                <i className="material-icons right">navigate_next</i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}