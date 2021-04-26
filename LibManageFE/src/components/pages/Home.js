// import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import {GET_ALL_BOOKS} from "../../api/apiService";
import "./css/home.css"

export default function Home() {
    const [book, setBook] = useState([]);
    const [bookId, setBookId] = useState([]);
    useEffect(() => {
        GET_ALL_BOOKS(`books`).then(item => setBook(item.data))
        console.log(GET_ALL_BOOKS);
    }, [])

    function CheckBook(Id) {

        for (let i = 0; i < bookId.length; i++) {
            if (bookId[i] === Id) {
                alert('This book is in list request already');
                return false;
            }
        }
        return true;
    }

    function Borrow(Id) {

        if (bookId.length < 5) {
            if (CheckBook(Id)) {
                setBookId((arr) => [...arr, Id]);
            }

        } else {
            alert('You cannot borrow more than 5 books');
        }

    }

    function Remove(Id) {
        for (let i = 0; i < bookId.length; i++) {

            if (bookId[i] === Id) {

                bookId.splice(i, 1);
                setBookId(bookId => bookId.filter(item =>
                    item.bookId !== Id
                ));

            }
        }
    }

    return (
        <div className="container kingofrap">
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        {bookId.map((b) => (
                            <tbody>
                            {book &&
                            book.length > 0 &&
                            book.map((p) => {
                                if (p.id === b) {
                                    return (
                                        <tr>
                                            <th scope="row">{b}</th>
                                            <td>{p.title}</td>
                                            <td>{p.author}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    Remove(p.id)
                                                }}>Remove
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                            </tbody>
                        ))}
                    </table>
                    <button type="submit" className="btn btn-info">Send Request Borrow</button>
                </div>
            </div>

            <div className="row" style={{marginTop:20}}>
                {book &&
                book.length > 0 &&
                book.map((p) => (

                    <div className="col-md-4 book ">
                        <div>
                            <img className="imgBook" src={p.image} alt="Card image cap"/>
                            <div>
                                <h5> {p.title}</h5>
                                <h6> {p.author}</h6>
                                <h6> ID : {p.id}</h6>

                                {/* <div>{p.description}</div> */}
                                {/*<Link className="btn btn-success" to={`/detailbook/${p.bookId}`}>Detail</Link>*/}
                                {/* <Link className="btn btn-primary" to={`/editbook/${p.bookId}`}>Edit</Link> */}
                                <button className="btn btn-info" onClick={() => {
                                    Borrow(p.id)
                                }}>Add to borrow
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}