import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdminBusAxios } from '../../api/api_instance';
import { TSuccess } from '../../toastify/Toastify';

function createData(id, bus_stop_1, distance, time, bus_stop_2) {
    return { id, bus_stop_1, distance, time, bus_stop_2 };
}


function ListBusConnection() {

    const [rows, setRows] = useState([])

    const DeleteRow = async (id) =>{
        AdminBusAxios.delete(`/bus/connect/delete/${id}`).then((res)=>{
            ListConnection()
            TSuccess('Removed successfully')
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(() => {
        ListConnection()
    }, [])

    const ListConnection = async() =>{
        await AdminBusAxios.get('/bus/connect/list').then((res) => {
            const newArray = res.data.map(item => createData(item.id, item.bus_stop_1.stop_name, item.distance, item.time, item.bus_stop_2.stop_name));
            setRows(newArray)
        }).catch((err) => {
            console.log(err);
        })
    }
   


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Stop 1</TableCell>
                        <TableCell align="left">Distance</TableCell>
                        <TableCell align="left">Time</TableCell>
                        <TableCell align="center">Stop 2</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.bus_stop_1}
                                </TableCell>
                                <TableCell align="left">{row.distance} Km</TableCell>
                                <TableCell align="left">{row.time} sec</TableCell>
                                <TableCell align="center">{row.bus_stop_2}</TableCell>
                                <TableCell align="center">
                                    <button onClick={()=>{DeleteRow(row.id)}} class="bg-white hover:bg-red-700 text-red-400 font-bold py-1 px-3 rounded-2xl">
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListBusConnection