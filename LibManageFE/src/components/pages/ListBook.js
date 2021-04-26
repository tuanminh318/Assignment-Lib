import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom'
import {DELETE_BOOK_ID, GET_ALL_BOOKS} from "../../api/apiService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        width: '100%',
        margin: 'auto'
    },
    removeLink: {
        textDecoration: 'none'
    }
}));
export default function ListBook() {
    const classes = useStyles();
    const [books, setBooks] = useState({});
    const [checkDeleteBook, setCheckDeleteBook] = useState(false);
    const [close, setClose] = React.useState(false);
    useEffect(() => {
        GET_ALL_BOOKS(`books`).then(item => setBooks(item.data))
        console.log(GET_ALL_BOOKS);
    }, [])

    const deleteBookID = (id) => {

        DELETE_BOOK_ID(`books/${id}`).then(item => {
            console.log(item)
            if (item.data === 1) {
                setCheckDeleteBook(true);
                setBooks(books.filter(key => key.id !== id))
            }
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {checkDeleteBook && <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setClose(true);
                                        setCheckDeleteBook(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                        >Detele successfuly</Alert>}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="center">Content Short</TableCell>
                                        <TableCell align="center">Author</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Modify</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.length > 0 && books.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">{row.title}</TableCell>
                                            <TableCell align="left">{row.contentShort}</TableCell>
                                            <TableCell align="center">{row.author}</TableCell>
                                            <TableCell align="center"><img src={row.image} style={{
                                                height: 150,
                                                width: 100
                                            }}/></TableCell>
                                            <TableCell align="center">{row.categoryId}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/edit/book/${row.id}`} className={classes.removeLink}>
                                                    <Button size="small" variant="contained"
                                                            color="primary">Edit</Button></Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button size="small" variant="contained" color="secondary"
                                                        onClick={() => deleteBookID(row.id)}>Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
