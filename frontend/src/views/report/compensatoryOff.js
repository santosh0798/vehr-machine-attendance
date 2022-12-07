import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myEmployee, clearErrors } from '../../store/actions/employeeAction';

// material ui import
import {Box, Typography} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceTopbar from 'ui-component/attendence-topbar';
import { StyledContainer, StyledTable, StyledTableRow, StyledTableCell, StyledMainCardSalary } from 'ui-component/tables/tablestyle';
import Pagination from '@mui/material/Pagination';
import EmployeeSidepanel from 'ui-component/payment/employeeSidePanel';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const CompensatoryOffReport = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);

    const { error, orders } = useSelector((state) => state.myEmployee);
    console.log(orders);

    useEffect(() => {
        dispatch(myEmployee(page));
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, page]);
    const [open, setOpen] = useState('inactivesidebar');
    const [data, setData] = useState([]);


    const handleClickOpen = (item) => {
        setData(item);
        setOpen('activesidebar');
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleClose = () => {
        setOpen('inactivesidebar');
    };


    return (
        <StyledMainCardSalary>
            <AttendanceTopbar name="Compensatory Off Report" search="true"  date="true" weeklyOff="true"/>
            <Typography variant="body2">
                <StyledContainer component={Paper}>
                    <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">#</StyledTableCell>
                                <StyledTableCell align="center">UAN</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Shift</StyledTableCell>
                                <StyledTableCell align="center">Scheduled To</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.employees?.map((row, index) => (
                                <StyledTableRow
                                    key={(page - 1) * 10 + index + 1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row?.companyDetails?.UAN}</TableCell>
                                    <TableCell align="center">{row?.personalDetails?.fullName}</TableCell>
                                    <TableCell align="center">Shift A</TableCell>
                                    <TableCell align="center">02/12/2022</TableCell>

                                    <TableCell align="center">Present</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                    <Pagination
                        count={Math.floor(orders?.employeeCount / 10) + 1}
                        color="primary"
                        style={{ float: 'right' }}
                        page={page}
                        onChange={handleChange}
                    />
                </StyledContainer>
            </Typography>
            <div className={`view-salary-sidebar ${open}`}>
                <Typography variant="body2">
                    <EmployeeSidepanel
                        data={data}
                        parentCallback={handleClose}
                        // count={datacount}
                        // todaydays={parseInt(daysInMonth(date.getMonth() + 1, date.getFullYear()), 10)}
                    />
                </Typography>
            </div>
        </StyledMainCardSalary>
    );
};

export default CompensatoryOffReport;
