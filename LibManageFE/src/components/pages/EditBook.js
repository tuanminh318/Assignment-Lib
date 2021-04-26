import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Alert from '@material-ui/lab/Alert';
import {Link, Redirect} from 'react-router-dom';
import {GET_ALL_CATEGORIES, GET_BOOK_ID, PUT_EDIT_BOOK} from "../../api/apiService";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    link: {
        padding: 10,
        display: 'inline-block'
    },
    txtInput: {
        width: '98%',
        margin: '1%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EditBook({match}) {
    const classes = useStyles();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState(null)
    const [contentShort, setContentShort] = useState(null)
    const [author, setAuthor] = useState(null)
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        //console.log(location)
        //console.log(match.params.id)

        GET_BOOK_ID(`books`, match.params.id).then(book => {
            setId(book.data.id)
            setTitle(book.data.title);
            setContentShort(book.data.contentShort);
            setAuthor(book.data.author);
            setImage(book.data.image);
            setCategory(book.data.categoryId)
        })

        GET_ALL_CATEGORIES('categories').then(item => {
            setCategories(item.data);
        });

    }, [match.params.id])

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeBody = (event) => {
        setContentShort(event.target.value)
    }
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value)
    }
    const handleChangeImage = (event) => {
        setImage(event.target.value)
    }
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const EditProduct = (event) => {
        event.preventDefault();
            let book = {
                Title: title,
                ContentShort: contentShort,
                Author: author,
                Image: image,
                CategoryId: category
            }
            PUT_EDIT_BOOK(`books/${id}`, book).then(item => {
                // if (item.data === 1) {
                    setCheckUpdate(true);
                //}
            })
    }

    if (checkUpdate) {
        return <Redirect to="/book"/>
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Edit Book
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title
                                </Typography>
                                <TextField id="Title" onChange={handleChangeTitle} value={title} name="Title"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Content Short
                                </Typography>
                                <TextField id="outlined-multiline-static" onChange={handleChangeBody}
                                           value={contentShort} name="Body" className={classes.txtInput} multiline
                                           rows={4} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Author
                                </Typography>
                                <TextField id="Author" onChange={handleChangeAuthor} value={author} name="Author"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Image
                                </Typography>
                                <TextField id="Image" onChange={handleChangeImage} value={image} name="Image"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Choose Category
                                </Typography>
                                <TextField
                                    id="outlined-select-currency-native"
                                    name="categoryId"
                                    select
                                    value={category}
                                    onChange={handleChangeCategory}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    className={classes.txtInput}
                                >
                                    {/*<option value="0">Choose category</option>*/}
                                    {/*{categories.length > 0 && categories.map((option) => (*/}
                                    {/*    <option key={option.categoryId} value={option.categoryId}>*/}
                                    {/*        {option.name}*/}
                                    {/*    </option>*/}
                                    {/*))}*/}
                                    <option value="0">Choose category</option>
                                    {categories.length > 0 && categories.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={EditProduct} fullWidth variant="contained"
                                        color="primary" className={classes.submit}>
                                    Update book
                                </Button>
                                <Link to={`/book`}>
                                    <Button type="button" variant="contained" fullWidth
                                            color="info">Cancel</Button></Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}