import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import fetchAllExample from "../utility/api/fetchAllExample";

const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    searchPage: {
        margin: 50
    }
});

export default function SearchResult() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const hits = useSelector((state) => state.searchData.data);

    useEffect(() => {
        if (hits.length > 0) {
            setLoading(false);
        }
    }, [hits]);

    const getAll = () => {
        dispatch(fetchAllExample());
        setLoading(true);
    }

    return (
        <div className={classes.searchPage}>
            <div>
                <button onClick={getAll}>Get All Data</button>
            </div>

            {loading && (
                <div>Loading...</div>
            )}

            {hits.length > 0 && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hits.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell align="left">{row._id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row._source.visualization.title}
                                    </TableCell>
                                    <TableCell align="left">{row._source.type}</TableCell>
                                    <TableCell align="left">{row._source.updated_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

