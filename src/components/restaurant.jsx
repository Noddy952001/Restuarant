import React, { useEffect, useState } from "react"
import axios from "axios"

export const Restaurants = () => {

        const [data,setData] = useState([]);
        const [counter ,setCounter] = useState(0)
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
                
              }
            })
                .then((res) => {
                 setData(res.data);
                }) 
                .catch((err) => {
                    setData([]);
                });
          };



        useEffect(() => {
            getdata(page, perPage);
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
            setCounter(counter+1)
          
            console.log(All_data)
        }


        function Handel_rating(){
            let All_data = [...data]

            All_data = All_data.filter((el) => {

              return el.rating > 3
           
            })
            setData(All_data);
            setCounter(counter+1)

            console.log(All_data)
            
            // All_data.sort( function (el){
            //     if(el.rating > 2.5){
            //         return el.rating;
            //     }
            //     console.log(el.rating)
            // })
            // setData(All_data);
            // setCounter(counter+1)
            
        }


        function Handling_payment(){


            // data.sort(function(el){
            //   if(el.payment_methods == "cash"){
            //       return el.payment_methods
            //   }
            // })

            data.filter(({ payment_methods }) => payment_methods === "cash")
            setData(data);
            setCounter(counter+1)
            
            console.log(data)

        }




        return (
          <>

            <div>
                <button onClick={Handling_payment}>Cash</button>
                <button>card</button>
                <button>All</button>
            </div>

            <div>
                <button>All</button>
                <button onClick={Handel_rating}>above 4</button>
                <button>above 3</button>
                <button>above 2</button>

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