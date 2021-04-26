import React, {Component, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';

import {GET_ALL_CATEGORIES, POST_ADD_BOOK} from "../../api/apiService";

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

export default function AddProduct() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [title, setTitle] = useState(null)
    const [contentshort, setContentShort] = useState(null)
    const [author, setAuthor] = useState(null)
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        GET_ALL_CATEGORIES('categories').then(item => {
            setCategories(item.data);
        });
    }, [])

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeContentShort = (event) => {
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
    const addBook = (event) => {
        event.preventDefault();
        if (title !== "" && contentshort !== "" && author !== "" && image !== "" && category > 0) {
            let book = {
                Title: title,
                ContentShort: contentshort,
                Author: author,
                Image: image,
                CategoryId: category
            }
            POST_ADD_BOOK(`books`, book).then(item => {
                if (item.data === 1) {
                    setCheckAdd(true);
                }
            })
        } else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    }
    if (checkAdd) {
        return <Redirect to="/"/>
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Book
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title
                                </Typography>
                                <TextField id="Title" onChange={handleChangeTitle} name="Title" label="Title"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    ContentShort
                                </Typography>
                                <TextField id="outlined-multiline-static" onChange={handleChangeContentShort}
                                           label="ContentShort"
                                           name="ContentShort" className={classes.txtInput} multiline rows={4}
                                           variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Author
                                </Typography>
                                <TextField id="Author" onChange={handleChangeAuthor} name="Author" label="Author"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Image
                                </Typography>
                                <TextField id="Image" onChange={handleChangeImage} name="Image" label="Image"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Choose Category
                                </Typography>
                                <TextField
                                    id="outlined-select-currency-native"
                                    name="idCategory"
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
                                    <option value="0">Choose category</option>
                                    {categories.length > 0 && categories.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={addBook} fullWidth variant="contained" color="primary"
                                        className={classes.submit}>
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

