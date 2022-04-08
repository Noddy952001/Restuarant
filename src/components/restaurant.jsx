import React, { useEffect, useState } from "react"
import axios from "axios"

export const Restaurants = () => {

        const [data,setData] = useState([]);
        const [filterData , setfilterData] = useState([])
        const [status , setStatus] = useState(true)
        const [page, setPage] = useState(1);
        const perPage = 5;


        React.useEffect(()=>{
          getdata()
        },[])

        const getdata = (page, perPage) => {
            axios("http://localhost:3001/data", {
              method: "GET",
              params: {
                _page: page,
                _limit: perPage,
                // payment_methods : Payment,
               
              }
            })
                .then((res) => {
                 setData(res.data);
                 setfilterData(res.data)
                }) 
                .catch((err) => {
                    setData([]);
                });
          };


        useEffect(() => {
            getdata(page, perPage ) ;
        }, [page, perPage]);

        
        function handel_Acc_Dcc(){
            let All_data = data  
          
            if(status == true){
                All_data.sort( function (a,b){
                  return Number(a.costForTwo) - Number(b.costForTwo);
                })
                setStatus(false)
            }
            else if(status == false){
                All_data.sort( function (a,b){
                    return  Number(b.costForTwo)-Number(a.costForTwo);
                })
                setStatus(true)
            }
            setData(All_data);
          
            console.log(All_data)
        }

        

        function Handel_rating(rating){
            let All_data = [...filterData]

            All_data = All_data.filter((el) => {
              return el.rating > rating
            })
            setData(All_data);
            console.log(All_data)
        }


        function Handling_payment_cash(){
            let All_data = [...filterData]

            All_data = All_data.filter((el) => {
                if(el.payment_methods == "cash"){
                    return el.payment_methods
                }
            })
            setData(All_data);
            console.log(All_data)
        }

        function Handling_payment_card(){
            let All_data = [...filterData]

            All_data = All_data.filter((el) => {
                if(el.payment_methods == "card"){
                    return el.payment_methods
                }
            })
            setData(All_data);
            console.log(All_data)
        }

   
            const All_btn_data = () => {
                axios.get("http://localhost:3001/data").then(function (res){
                    setData(res.data)
                })
            }


        return (
          <>

            <div>
                <button onClick={ () => Handling_payment_cash() }>Cash</button>
                <button onClick={() => Handling_payment_card()} >Card</button>
                <button  onClick={All_btn_data}>All</button>
            </div>

            <div>
                <button onClick={All_btn_data}>All</button>
                <button onClick={ () => Handel_rating(4)}>above 4</button>
                <button onClick={() => Handel_rating(3)}>above 3</button>
                <button onClick={() => Handel_rating(2)}>above 2</button>
            </div>
            
            <div>
                <button onClick={handel_Acc_Dcc}>Acc</button>
                <button onClick={handel_Acc_Dcc}>Dec</button>

            </div>
        
            {data.map((el) => {
                return (

                    <div >
                        <div className="main" >

                            <div style={{padding: "10px"}}>
                                <img  src={el.src} alt="va"/>
                            </div>

                            <div style={
                                {
                                 fontSize: "20px" ,
                                 textAlign: "start",
                                 marginLeft:"30px", 
                                 width: "450px",
                                 padding:"10px"
                            }}>
                                <div > <h3 style={{margin : "0px"}}>Name : {el.name}</h3></div>
                                <div >Rating :- {el.rating}</div>
                                <div >Reviews :- {el.reviews}</div>
                                <div >Cost :- {el.costForTwo}</div>
                                <div >Rating :- {el.rating}</div>
                                <div >Accept :- {el.payment_methods}</div>
                            </div>
                        
                        </div>
                     </div>
                );
            })}

            <div>
                <button onClick={() => setPage((page) => page - 1)}>
                  PREV
                </button>
                <button  onClick={() => setPage(page + 1)}>
                    NEXT
                </button>
                <div>Current page: {page}</div>
            </div>
          </>
        );
    };