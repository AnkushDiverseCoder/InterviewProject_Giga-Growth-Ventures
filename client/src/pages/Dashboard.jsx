import { useEffect, useState } from "react"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import api from "../utils/ApiRequest";
import { useNavigate } from "react-router-dom";

const options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/stocks',
  params: {
    exchange: 'NASDAQ',
    format: 'json',
    type: 'Common Stock'
  },
  headers: {
    'X-RapidAPI-Key': '9d9361c7b6mshaeb4732e5537c2cp192a1bjsn581cf3780f2e',
    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
  }
};



const Dashboard = () => {
  const [data, setData] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState(null)

  const [email, setEmail] = useState("")
  const [emailDialoge, setEmailDialoge] = useState(false);
  
  const [whatsapp, setWhatsapp] = useState()
  const [whatsappDialoge, setWhatsappDialoge] = useState(false);

  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate();
  useEffect(()=>{
     if(!currentUser){
      navigate("/signIn")
     }  
  },[currentUser,navigate])
  
  useEffect(() => {
    // eslint-disable-next-line react/prop-types, arrow-body-style
    const result = data?.filter((stock) => {
      return stock?.name?.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search, data, setFilterData])
  
  const fetchStockPrice = async (symbol) => {
    const priceOption = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/price',
      params: {
        symbol: symbol,
        format: 'json',
        outputsize: '30'
      },
      headers: {
        'X-RapidAPI-Key': '9d9361c7b6mshaeb4732e5537c2cp192a1bjsn581cf3780f2e',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    await axios.request(priceOption).then((response) => setPrice(response.data.price));
  }

  const handleClickOpen = async (e, symbol) => {
    e.preventDefault();
    fetchStockPrice(symbol);
    setEmailDialoge(true);
  };
  const handleClickOpen2 = async (e, symbol) => {
    e.preventDefault();
    fetchStockPrice(symbol);
    setWhatsappDialoge(true);
  };

  const handleClose = () => {
    setEmailDialoge(false);
  };
  const handleClose2 = () => {
    setWhatsappDialoge(false);
  };

  const sendMail = (e, name) => {
    e.preventDefault();
    const subject = `${name} Stock Price`
    const body = `The ${name} Current Price is ${price}`
    const { data } = api.post("/sendMail", { subject, body, email })
    console.log(data);
    setEmailDialoge(false);
    setEmail("");
  }
  
  const sendWhatsapp = (e, name) => {
    e.preventDefault();
    const body = `The ${name} Current Price is ${price}`
    let url  = `https://web.whatsapp.com/send?${whatsapp}&text=${body}&app_absent=0`
    window.open(url);
    handleClose2(false);
    setWhatsapp("");
  }
  
  
  const columns = [
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 150,
    },
    {
      field: 'exchange',
      headerName: 'Exchange',
      width: 110,
    },
    {
      field: 'name',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 400,
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 160,
    },
    {
      field: 'Email',
      headerName: 'Email',
      renderCell: (params) => {
        return (
          <>
            <button
              className="bg-teal-700 rounded-lg text-white text-lg p-2 px-7 hover:bg-teal-600 transition-all duration-300 ease-out"
              onClick={(e) => handleClickOpen(e, params.row.symbol)}
            >
              Email
            </button>
            <Dialog open={emailDialoge} onClose={handleClose}>
              <DialogTitle>Email Stock Price</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The {params.row.name} Current Price is {price}
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={(e) => sendMail(e, params.row.name)}>Send Mail</Button>
              </DialogActions>
            </Dialog>
          </>
        )
      },
      width: 140,
    },
    {
      field: 'whatsapp',
      headerName: 'whatsapp',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <button
              className="bg-teal-700 rounded-lg text-white text-lg p-2 px-7 hover:bg-teal-600 transition-all duration-300 ease-out"
              onClick={(e) => handleClickOpen2(e, params.row.symbol)}
            >
              Whatsapp
            </button>
            <Dialog open={whatsappDialoge} onClose={handleClose2}>
              <DialogTitle>Email Stock Price</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The {params.row.name} Current Price is {price}
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  type="Number"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Cancel</Button>
                <Button onClick={(e) => sendWhatsapp(e, params.row.name)}>Send Whatsapp</Button>
              </DialogActions>
            </Dialog>
          </>
        )
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.request(options);
      setData(response?.data.data);
      setFilterData(response?.data.data);
    }
    fetchData();
  }, [])

  return (
    <div className="bg-gray-900 h-screen text-white">
      <Header name={currentUser?.name} url={currentUser?.img} search={search} setSearch={setSearch}/>
      {data && <DataGrid
        rows={filterData}
        getRowId={(row) => row.symbol}
        columns={columns}
        sx={{ color: 'black', backgroundColor: 'white', maxHeight: "calc(100vh - 82px)", maxWidth: "60vw", margin: "auto", padding: "20px" }}
        pageSizeOptions={[5]}
      />}
    </div>
  )
}

export default Dashboard