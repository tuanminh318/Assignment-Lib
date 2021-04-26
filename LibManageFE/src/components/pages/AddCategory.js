import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";
import React, {useState} from "react";
import {POST_ADD_CATEGORY} from "../../api/apiService";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
export default function AddCategory() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [name, setName] = useState(null)


    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const addCategory = (event) => {
        event.preventDefault();
        if (name !== "") {
            let category = {
                Name: name,
            }
            POST_ADD_CATEGORY(`categories`, category).then(item => {
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
                            Add Category
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name
                                </Typography>
                                <TextField id="Name" onChange={handleChangeName} name="Name" label="Title"
                                           variant="outlined" className={classes.txtInput} size="small"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={addCategory} fullWidth variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                    Add Category
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}