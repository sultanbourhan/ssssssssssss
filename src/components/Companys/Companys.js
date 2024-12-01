import React, { useState, useEffect , useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Axios from "axios";
import StarRating from "../StarRating/StarRating";
import "./Companys.css";
import img_hero1 from "../../image/hero1.jpg"; // صورة افتراضية إذا لم تكن موجودة

import { useNavigate } from "react-router-dom";

import Loading from "../Loading/Loading";

import { MyContext } from '../Context';



export default function Companys() {

  const { id_C, setid_C } = useContext(MyContext);


  const [company, setCompany] = useState([]);
  const [company_All, setCompany_All] = useState(0);
  const [none_All, setnone_All] = useState("block");

  const [loading, setLoading] = useState(true);

  const [search, setsearch] = useState("");
  const [Country, setCountry] = useState("");
  const [limit, setlimit] = useState(40);

  const Navigate = useNavigate();

  useEffect( () =>  {
    window.scrollTo(0, 0);
    setLoading(true)
    Axios.get(
      `https://b2you.net/api/v2/company?keyword=${search}${Country !== "" ? `&Country=${Country}`: ""}${id_C !== "" ? `&categoreys=${id_C}`: "" }&limit=${limit}`
    )
      .then((res) => {
        setCompany(res.data.data);
        setCompany_All(res.data.pagination.Allcompany);
       
        if(limit > res.data.pagination.Allcompany ){
          setnone_All("none")
        }



  
        setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

      

  }, [search ,Country,id_C , limit]);

  // ====================================================

  const [category, setcategory] = useState([]);

  useEffect(() => {
    
    Axios.get(
      `https://b2you.net/api/v2/company/get_Categorey`
    )
      .then((res) => {
        setcategory(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);




  // ==============================================================

  // ===============================================================
  const arabCountries = [
    "السعودية",
    "الإمارات العربية المتحدة",
    "مصر",
    "العراق",
    "الأردن",
    "الكويت",
    "لبنان",
    "الجزائر",
    "السودان",
    "المغرب",
    "عمان",
    "فلسطين",
    "اليمن",
    "ليبيا",
    "تونس",
    "البحرين",
    "موريتانيا",
    "الصومال",
    "جيبوتي",
    "القدس",
    "جزر القمر",
    "سوريا",
];


  // =======================================================

  // التحقق من حالة تحميل البيانات
  // if (loading) {
  //   return <Loading />; // عرض شاشة التحميل
  // }

  return (
    <div className="companys">
      <div className="header_comp">
        <div className="select">
          <div className="coolinput">
            <label htmlFor="input" className="text">
            الفئات:
            </label>
            <select className="input" onChange={(e)=>setid_C(e.target.value)} onClick={(e)=>setid_C(e.target.value)}>
              <option value={""} >جميع الفئات</option>
              {category
                ? category.map((cat) => {
                    return <option selected={id_C === cat._id} key={cat._id} value={cat._id}>{cat.name}</option>;
                  })
                : null}
            </select>
          </div>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              البلدان:
            </label>

            <select className="input" onChange={(e)=>setCountry(e.target.value)} >
              <option value="" >جميع البلدان</option>
              {arabCountries.map((cat) => {
                return <option key={cat} value={cat}>{cat}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="input">
          <div className="coolinput">
            <label htmlFor="input" className="text">
              بحث:
            </label>
            <input
              type="text"
              placeholder="بحث عن الشركات"
              value={search}
              className="input"
              onChange={(e) => setsearch(e.target.value)}
            />
            <FontAwesomeIcon className="icon_search" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      <div className="cardss" >
        {
          loading ? <Loading/> : company.length > 0 ? (
            company.map((comp) => {
              // حماية ضد القيم الفارغة أو غير الصحيحة
              const logoImage = comp.logoImage
                ? `https://${comp.logoImage}`
                : img_hero1; // صورة افتراضية إذا كانت الصورة فارغة
              const companyImage = comp.companyImage
                ? `https://${comp.companyImage}`
                : img_hero1; // صورة افتراضية للشركة
              const categoryName = comp.categorey
                ? comp.categorey.name
                : "Unknown"; // إذا كانت الفئة فارغة
              const country = comp.Country || "Not Provided"; // إذا كان البلد غير موجود
              const city = comp.city || "Not Provided"; // إذا كانت المدينة غير موجودة
              const street = comp.street || "Not Provided"; // إذا كان الشارع غير موجود
  
              return (
                <div className="card" key={comp._id}>
                  <div className="img">
                    <img src={logoImage} alt={comp.name || "Company Logo"} />
                  </div>
                  <div
                    className="top-section"
                    style={{
                      backgroundImage: `url(${companyImage})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="border"></div>
                    <div className="icons">
  
                    </div>
                  </div>
                  <div className="bottom-section">
                    <h1 className="title">{comp.name}</h1>
                    <span style={{marginBottom: "10px"}}>البلد: {comp.Country}</span>
                    <p>
                      <span></span>
                      الفئة: {categoryName}
                    </p>
                    <StarRating rating={comp.ratingsAverage ? comp.ratingsAverage : 0} />
                    <button className="button" onClick={() => Navigate(`/company_id/${comp._id}`)}>
                      زيارة الشركة
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>لا يوجد شركات حاليا.</h1>
          )
        }
      </div>
      <button style={{display : none_All}} onClick={()=>setlimit(limit + 40)} className="button">المزيد من الشركات</button>
    </div>
  );
}
