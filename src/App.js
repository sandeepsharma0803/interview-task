import logo from "./logo.svg";
import "./App.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPrevious, FcNext } from "react-icons/fc";

function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterdata] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [perPageContent, setPerPageContent] = useState(6);

  const handlePreviousData = () => {
    setpageNumber(pageNumber - 6);
    setPerPageContent(perPageContent - 6);
    setFilterdata(data.slice(pageNumber, perPageContent));
  };
  const handleNextData = () => {
    setpageNumber(pageNumber + 6);
    setPerPageContent(perPageContent + 6);
    setFilterdata(data.slice(pageNumber, perPageContent));
  };

  const handleShow = (e) => {
    console.log(e, "single Data");
    setShow(true);
    setBody(e.body);
    setTitle(e.title);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response);
        setData(response.data);
        setFilterdata(response.data.slice(0, 6));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemove = (e) => {
    // e.preventDefault();
    const newArr = data.filter((item) => item.id !== e.id);
    // update your state with filtered id
    setpageNumber(pageNumber + 1);
    setPerPageContent(perPageContent + 1);
    setFilterdata(newArr.slice(pageNumber, perPageContent));
    console.log(newArr, "new Data By Filter");
  };

  const handleSave = () => {
    setTitle("");
    setBody("");
    // alert("data updated successfully");
  };

  return (
    <div className="container" style={{ background: "skyblue" }}>
      {isLoading ? (
        <div className="text-center d-flex loading">Loading...</div>
      ) : (
        <div
          className="row p-3 d-flex"
          style={{ justifyContent: "space-around" }}
        >
          {filterData.map((items, index) => {
            return (
              <div
                className="col-md-5 col-lg-3 col-sm-5 col-sx-12 mx-1  my-3 py-2"
                key={items.id}
                style={{
                  background: "white",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <div style={{ textAlign: "end" }}>
                  <RxCross2
                    color="red"
                    size={22}
                    onClick={() => handleRemove(items)}
                  />
                </div>
                <div className="title">{items.title}</div>
                <div className="pera">{items.body}</div>

                <div className=" ">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKCp0LFHzMq6waGJH316n3SpvKYXYnOPPdPEEo_s54w&s"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <button
                    onClick={() => handleShow(items)}
                    className="btn btn-danger"
                  >
                    We are Listening{" "}
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Single Card Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <label>Title</label>
                        <input
                          value={title}
                          style={{ width: "100%" }}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div className="mt-2">
                        <label>Body</label>
                        <textarea
                          rows={4}
                          onChange={(e) => setBody(e.target.value)}
                          value={body}
                          style={{ width: "100%" }}
                          type="text"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div>
          <button disabled={pageNumber == 0} onClick={handlePreviousData}>
            <FcPrevious />
            Pre
          </button>
        </div>
        <div>
          <button
            disabled={pageNumber == data.length - 6}
            onClick={handleNextData}
          >
            Next
            <FcNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
