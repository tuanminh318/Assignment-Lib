import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {Link, Redirect} from 'react-router-dom';
import {GET_CATEGORY_ID, PUT_EDIT_CATEGORY} from "../../api/apiService";

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
export default function EditProduct({match, location}) {
    console.log(match.params.id)
    const classes = useStyles();

    const [checkUpdate, setCheckUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState(null)

    useEffect(() => {
        GET_CATEGORY_ID(`categories`, match.params.id).then(product => {
            setId(product.data.id)
            setName(product.data.name);
        })
    }, [])

    const handleChangeName = (event) => {
        setName(event.target.value)
    };

    const EditProduct = (event) => {
        event.preventDefault();
        // if (name !== "") {
        let product = {
            Name: name
        }
        PUT_EDIT_CATEGORY(`categories/${id}`, product).then(item => {
            // if (item.data === 1) {
            setCheckUpdate(true);
            // }
        })
        // } else {
        //     alert("Bạn chưa nhập đủ thông tin!");
        // }
    }


    if (checkUpdate) {
        return <Redirect to="/"/>
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Edit Category
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name
                                </Typography>
                                <TextField id="Name" onChange={handleChangeName} value={name} name="Name"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={EditProduct} fullWidth variant="contained"
                                        color="primary" className={classes.submit}>
                                    Update category
                                </Button>
                                <Link to={`/category`}>
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