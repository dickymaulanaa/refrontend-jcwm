import Axios from "axios";
import React, { Component } from "react";
import { api_url } from "../helpers/api_url";
import { Button, Input, Table } from "reactstrap";
// import DatePicker from "react-datepicker";


class Inventory extends Component {
  state = {
    data: [],
    selectedData: null,
    inputData: {
      date: 0,
      name: "",
      serial: 0,
      stock: 0,
      price: 0,
      category:"",
    },
    inputAdd: {
        date: "",
        name: "",
        serial: "",
        stock: "",
        price: "",
        category:"",
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get(`${api_url}/products`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (id) => {
    const checkOutBool = window.confirm("Yakin Ingin Menghapus barang?");
    if (checkOutBool){
    Axios.delete(`${api_url}/products/${id}`)
      .then((res) => {
        Axios.get(`${api_url}/products`).then((res) => {
          this.setState({
            data: res.data,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  editData = (id) => {
    const data = this.state.data.find((val) => val.id === id);
    this.setState({
      selectedData: id,
      inputData: data,
    });
  };

  cancelEdit = () => {
    this.setState({
      selectedData: null,
    });
  };

  confirmEdit = (id) => {
    const { inputData } = this.state;
    Axios.patch(`${api_url}/products/${id}`, {
      ...inputData,
      price: parseInt(inputData.price),
      stock: parseInt(inputData.stock),
    })
      .then(() => {
        this.fetchData();
        this.setState({
          selectedData: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addData = () => {
    const { inputAdd } = this.state;
    Axios.post(`${api_url}/products`, {
      ...inputAdd,
      date : new Date(inputAdd.date),
      price: parseInt(inputAdd.price),
      stock: parseInt(inputAdd.stock),
    })
      .then(() => {
        console.log("masuk");
        this.fetchData();
        this.setState({
          inputAdd: {
            date: "",
            name: "",
            serial: "",
            stock: 0,
            price: 0,
            category:"",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChangeInput = (e) => {
    this.setState({
      inputData: {
        ...this.state.inputData, 
        [e.target.id]: e.target.value,
      },
    });
    console.log(this.state.inputData);
  };
  onChangeInputAdd = (e) => {
    this.setState({
      inputAdd: {
        ...this.state.inputAdd,
        [e.target.id]: e.target.value,
      },
    });
    console.log(this.state.inputAdd);
  };

  renderList = () => {
    return this.state.data.map((val) => {
      if (this.state.selectedData === val.id) {
        return (
          <tr>
            <td>{val.id}</td>
            <td>
              <Input
                defaultValue={val.date}
                id="date"
                readOnly 
              />
            </td>
            <td>
              <Input
                placeholder="Name"
                defaultValue={val.name}
                id="name"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="serial"
                defaultValue={val.serial}
                id="serial"
                readOnly 

              />
            </td>
            <td>
              <Input
                placeholder="stock"
                defaultValue={val.stock}
                id="stock"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="price"
                defaultValue={val.price}
                id="price"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="category"
                defaultValue={val.category}
                id="category"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Button onClick={this.cancelEdit}>Cancel</Button>
            </td>
            <td>
              <Button color="info" onClick={() => this.confirmEdit(val.id)}>
                Save
              </Button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={val.id}>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>{val.name}</td>
          <td>{val.serial}</td>
          <td>{val.stock}</td>
          <td>Rp.{val.price.toLocaleString()}</td>
          <td>
            <Button
              color="success"
              style={{ width: "75%" }}
              onClick={() => this.editData(val.id)}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              color="danger"
              style={{ width: "75%" }}
              onClick={() => this.deleteData(val.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { date, name, serial, price, stock, category} = this.state.inputAdd;
    return (
      <div>
        <Table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Nama Produk</th>
              <th>Serial Number</th>
              <th>Stok</th>
              <th>Harga</th>
              {/* <th>Category</th> */}

              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
          <tfoot>
            <tr>
              <td>#</td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd }
                  placeholder="date"
                  id="date"
                  value={date}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="name"
                  id="name"
                  value={name}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="serial"
                  id="serial"
                  value={serial}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="stock"
                  id="stock"
                  value={stock}
                />
              </td>
              <td>
                <Input

                  onChange={this.onChangeInputAdd}
                  placeholder="category"
                  id="category"
                  value={category}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="price"
                  id="price"
                  value={price}
                />
              </td>
              <td colSpan={2}>
                <Button onClick={this.addData} color="info">
                  Add
                </Button>
           
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default Inventory;
