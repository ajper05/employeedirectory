import React, { Component } from "react";
import Search from "./Search";
import EmployeeResult from "./EmployeeResult";
import API from "../utils/API";
import MaterialTable from "material-table";

class EmployeeContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: "",
  };

  // When this component mounts, grabs user info from the randomuser api
  componentDidMount() {
    API.search()
      .then((res) => {
        console.log(res);
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: <img alt={e.name.first} src={e.picture.large} />,
            email: e.email,
            phone: e.phone,
            key: i,
          })),
        });
      })
      .catch((err) => console.log(err));
  }

  filterEmployees = (searchkey) => {
    console.log(searchkey);
    console.log(this.state.result);
    var filterResult = this.state.result.filter(
      (person) => person.firstName === searchkey
    );

    this.setState({
      result: filterResult,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    this.filterEmployees(value);
    this.setState({
      [name]: value,
    });
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);
  };

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="container pt-4">
        <h2 className="text-center">Employee Directory Search</h2>

        <br />
        <br />

        <div>
          <MaterialTable
            columns={[
              { title: "Employee Photo", field: "picture", sorting: false },
              { title: "First Name", field: "firstName" },
              { title: "Last Name", field: "lastName", sorting: false },
              { title: "Email", field: "email", sorting: false },
              { title: "Phone", field: "phone", sorting: false },
            ]}
            data={this.state.result}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "left",
              showTitle: false,
            }}
          />
        </div>
      </div>
    );
  }
}

export default EmployeeContainer;
