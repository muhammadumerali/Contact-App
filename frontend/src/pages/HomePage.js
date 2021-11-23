import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { FiTrash2 } from 'react-icons/fi';
import { FaEdit } from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function HomePage() {

  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    axios.get('http://localhost:5000/api/contacts')
      .then((response) => {
        setContacts(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchContacts();
    return () => {

    };
  }, []);

  const handleDeleteContact = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/contacts/${id}`)
      .then((response) => {
        toast.success('DELETED');
        fetchContacts();
      }).catch((err) => {
        console.log(err);
        toast.error('Enternal Server Error');
      });
  };

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  const [contactId, setContactId] = useState(undefined);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (firstName === '' || firstName === undefined || firstName === ' ' || firstName === null) {
      toast.error('First Name is required');
      return;
    } else if (contactId !== undefined) {
      axios.put(`http://localhost:5000/api/contacts/${contactId}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        age: age
      })
        .then((response) => {
          toast.success(`Contact with Name "${response.data.firstName}" Updated`);
          fetchContacts();
          handleclearFields();
          handleClose();
        }).catch((err) => {
          console.log(err);
          toast.error('Enternal Server Error');
        });
    } else {
      axios.post('http://localhost:5000/api/contacts/create', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        age: age
      })
        .then((response) => {
          toast.success(`Contact with Name "${response.data.firstName}" created`);
          fetchContacts();
          handleclearFields();
          handleClose();
        }).catch((err) => {
          console.log(err);
          toast.error('Enternal Server Error');
        });
    }
  };


  const handleclearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setAge('');
    setContactId(undefined);
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditClick = (id, e) => {
    e.preventDefault();
    handleOpen();
    setContactId(id);
    axios.get(`http://localhost:5000/api/contacts/${id}`)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setAge(response.data.age);
      }).catch((err) => {
        console.log(err);
      });

  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <TableContainer component={Paper}>
        {!open && <Box
          style={{ width: "max-content", margin: 'auto' }}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <TextField
            id="outlined-password-input"
            label="FirstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="LastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Phone Number"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <AiFillPlusSquare
            style={{
              fontSize: 70,
              color: "#69bf80",
              cursor: "pointer"
            }}
            className="hover-buttons"
            onClick={(e) => handleAddContact(e)}
          />

          <MdClear
            style={{
              fontSize: 70,
              color: "#d46c6c",
              cursor: "pointer"
            }}
            className="hover-buttons"
            onClick={handleclearFields}
          />
        </Box>}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>FirstName</StyledTableCell>
              <StyledTableCell>LastName</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>PhoneNumber</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((_, index) => (
              <StyledTableRow key={index.toString()}>
                <StyledTableCell component="th" scope="row">
                  {_.firstName}
                </StyledTableCell>
                <StyledTableCell>{_.lastName}</StyledTableCell>
                <StyledTableCell>{_.email}</StyledTableCell>
                <StyledTableCell>{_.phoneNumber}</StyledTableCell>
                <StyledTableCell>{_.age}</StyledTableCell>
                <StyledTableCell>
                  <FaEdit className="hover-buttons" style={{ marginRight: 20, fontSize: 23, color: "#6ecbf0", cursor: "pointer" }} onClick={(e) => handleEditClick(_._id, e)} />
                  <FiTrash2 className="hover-buttons" style={{ fontSize: 23, color: "#d46c6c", cursor: "pointer" }} onClick={(e) => handleDeleteContact(_._id, e)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {contacts.length === 0 && <StyledTableCell>No Contacts - Add to See contacts</StyledTableCell>}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            style={{ width: 219, margin: 'auto' }}
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
          >
            <TextField
              id="outlined-password-input"
              label="FirstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="LastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Phone Number"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <AiFillPlusSquare
              style={{
                fontSize: 70,
                color: "#69bf80",
                cursor: "pointer"
              }}
              className="hover-buttons"
              onClick={(e) => handleAddContact(e)}
            />

            <MdClear
              style={{
                fontSize: 70,
                color: "#d46c6c",
                cursor: "pointer"
              }}
              className="hover-buttons"
              onClick={handleclearFields}

            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
