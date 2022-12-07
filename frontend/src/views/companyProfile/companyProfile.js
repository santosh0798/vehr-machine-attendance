import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    StyledMainCardSalary,
} from "../../ui-component/tables/tablestyle";
import AttendanceTopbar from "../../ui-component/attendence-topbar";
import {Container, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {getCompany, updateCompany} from "../../store/actions/companyAction";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {TimePicker} from "@mui/lab";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const ColorButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '22px',
    width: '100%',
    backgroundColor: '#009FBE'
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = useState(null);

    const [email, setEmail] = useState('');
    const [bonusPer, setBonusPer] = useState('');

    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAdd, setCompanyAdd] = useState('');
    const [designation, setDesignation] = useState('');

    const dispatch = useDispatch();
    const { error, orders } = useSelector((state) => state.myCompany);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    useEffect(() => {
        setCompanyName(orders?.user?.companyName);
        setEmail(orders?.user?.wages[orders?.user?.wages?.length - 1]?.minimumWages);
        setBonusPer(orders?.user?.bonusPercentage);
        setValue(orders?.user?.wages[orders?.user?.wages?.length - 1]?.bonasFrom);
        setDesignation(orders?.user?.wages[orders?.user?.wages?.length - 1]?.designation);

        setCompanyAdd(orders?.user?.companyAddress);
    }, [orders]);
    const submitHandler = (e) => {
        e.preventDefault();
        const x = {};
        console.log(e.target.elements.companyName.value);
        x.companyName = e.target.elements.companyName.value;

        x.minimumWages = e.target.elements['minimum-wages2'].value;
        x.bonusPercentage = e.target.elements.bonusPercentage.value;
        x.bonasFrom = e.target.elements.date.value;
        x.companyAddress = e.target.elements.companyAdd.value;
        x.designation = e.target.elements.designation.value;

        console.log(x);
        dispatch(updateCompany(x));
    };

    return (
        <StyledMainCardSalary>
            <AttendanceTopbar name="Profile Settings"/>
            <hr style={{color:"#f0f0f0"}}/>
            <Box
                sx={{ flexGrow: 1, display: 'flex' }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Profile Settings"
                    sx={{ borderRight: 1, borderColor: 'divider', height:'500px' }}
                >
                    <Tab label="Company Setting" {...a11yProps(0)} />
                    <Tab label="Attendance Settings" {...a11yProps(1)} />
                    <Tab label="Bonus Settings" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <>
                        {user && (
                            <Container>
                                <form onSubmit={submitHandler} encType="multipart/form-data">
                                    <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ marginTop: '5px' }}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="companyName"
                                                name="companyName"
                                                placeholder="Enter Company Name"
                                                fullWidth
                                                disabled
                                                variant="outlined"
                                                label="Enter Company Name"
                                                value={companyName}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="companyAdd"
                                                name="companyAdd"
                                                placeholder="Enter Company Address"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                label="Enter Company Addres"
                                                value={companyAdd}
                                                onChange={(e) => setCompanyAdd(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={5} sm={12}>
                                            <ColorButton variant="contained" type="submit">
                                                Update Company Address
                                            </ColorButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        )}
                    </>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {user && (
                        <Container>
                            <form onSubmit={submitHandler} encType="multipart/form-data">
                                <Grid container spacing={4} alignItems="center" justifyContent="center">
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="designation"
                                            name="designation"
                                            placeholder="Select Shift Type"
                                            value={designation}
                                            label="Select Shift Type"
                                            variant="outlined"
                                            fullWidth
                                            select
                                            onChange={(e) => setDesignation(e.target.value)}
                                        >
                                            <MenuItem value="General A">General Shift (09:00 AM to 05:00 PM)</MenuItem>
                                            <MenuItem value="General B">General Shift (10:00 AM to 06:00 PM)</MenuItem>
                                            <MenuItem value="Shift A">Shift A (07:00 AM to 03:00 PM)</MenuItem>
                                            <MenuItem value="Shift B">Shift B (03:00 PM to 11:00 PM)</MenuItem>
                                            <MenuItem value="Shift C">Shift C (11:00 PM to 07:00 AM)</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h3" gutterBottom>
                                            Check-In Time
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Set Check-In Time"
                                                fullwidth
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={6} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Set Check-In Buffer Time"
                                                value={value}
                                                fullwidth
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h3" gutterBottom>
                                            Check-Out Time
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Set Check-Out Time"
                                                value={value}
                                                fullwidth
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="Set Check-Out Buffer Time"
                                                value={value}
                                                fullwidth
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={5} sm={12}>
                                        <ColorButton variant="contained" type="submit">
                                            Update Attendance Settings
                                        </ColorButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>

                    {user && (
                        <Container>
                            <form onSubmit={submitHandler} encType="multipart/form-data">
                                <Grid container spacing={4} style={{ marginTop: '5px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="bonasPercentage"
                                            type="number"
                                            name="bonusPercentage"
                                            placeholder="Enter Bonus Percentage"
                                            fullWidth
                                            variant="outlined"
                                            label="Enter Bonus Percentage"
                                            value={bonusPer}
                                            onChange={(e) => setBonusPer(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="designation"
                                            name="designation"
                                            placeholder="Designation"
                                            value={designation}
                                            label="Designation"
                                            variant="outlined"
                                            fullWidth
                                            select
                                            onChange={(e) => setDesignation(e.target.value)}
                                        >
                                            <MenuItem value="Skilled">Skilled</MenuItem>
                                            <MenuItem value="Semi Skilled">Semi Skilled</MenuItem>
                                            <MenuItem value="Un Skilled">Un Skilled</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="minimum-wages2"
                                            type="text"
                                            name="minimum-wages2"
                                            placeholder="Enter Minimum Wages"
                                            fullWidth
                                            variant="outlined"
                                            label="Enter Minimum Wages"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Select Month"
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                value={value}
                                                renderInput={(params) => <TextField {...params} name="date" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>


                                    <Grid item xs={5} sm={12}>
                                        <ColorButton variant="contained" type="submit">
                                            Update Bonus Settings
                                        </ColorButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    )}
                </TabPanel>

            </Box>
        </StyledMainCardSalary>

    );
}
