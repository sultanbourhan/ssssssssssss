import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Get_company.css";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import user_img from "../../image/user.png";

import Loading from "../Loading/Loading";

import { format } from "date-fns";

export default function Get_company() {
  const [company, setcompany] = useState([]);
  const [id_company, setid_company] = useState();
  const [cookies] = useCookies(["token"]);
  const delete_but = useRef(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [result, setresult] = useState([]);

  const Navigate = useNavigate();

  const [category, setcategory] = useState([]);
  const [categoryfl, setcategoryfl] = useState("");
  const [Country, setCountry] = useState("");
  const [search, setsearch] = useState("");

  const [none_All, setnone_All] = useState("block");
  const [limit, setlimit] = useState(40);

  useEffect(() => {
    Axios.get(
      `https://b2you.net/api/v2/company?keyword=${search}${
        Country !== "" ? `&Country=${Country}` : ""
      }${categoryfl !== "" ? `&categoreys=${categoryfl}` : ""}&limit=${limit}`
    )
      .then((res) => {
        setcompany(res.data.data);
        setresult(res.data.pagination.Allcompany);

        if (limit > res.data.pagination.Allcompany) {
          setnone_All("none");
        }

        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [result, categoryfl, Country, search, limit]);

  const delete_company = () => {
    setloading(true);
    Axios.delete(
      `https://b2you.net/api/v2/company/delete_company_id/${id_company}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        setDeleteVisible(false);
        setcompany((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== id_company)
        ); // تحديث الحالة
        setloading(false);
      })
      .catch((error) => {
        console.error("Error deleting data", error);
      });
  };

  const open_delete = (id) => {
    setDeleteVisible(true);
    setid_company(id);
  };

  const clos_delete = () => {
    setDeleteVisible(false);
  };

  // =====================================================================

  useEffect(() => {
    Axios.get(
      `https://b2you.net/api/v2/company/get_Categorey`
    )
      .then((res) => {
        setcategory(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // -------------------------------------------------------------------

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Get_company">
      <h2>قائمة الشركات</h2>

      <div
        className="delete"
        ref={delete_but}
        style={{ display: deleteVisible ? "flex" : "none" }}
      >
        <div className="del">
          <p>هل تريد حقًا حذف هذه الشركة؟</p>
          <div className="but_del">
            <button className="button" onClick={delete_company}>
              حذف
            </button>
            <button className="button" onClick={clos_delete}>
              رجوع
            </button>
          </div>
        </div>
      </div>

      <div className="flter">
        <div className="coolinput">
          <label htmlFor="input" className="text">
            الفئات:
          </label>
          <select
            className="input"
            onChange={(e) => setcategoryfl(e.target.value)}
          >
            <option value={""}>جميع الفئات</option>
            {category
              ? category.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="coolinput">
          <label htmlFor="input" className="text">
            البلدان:
          </label>

          <select
            className="input"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">جميع البلدان</option>
            {arabCountries.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
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
          <FontAwesomeIcon
            style={{
              position: "absolute",
              right: "9px",
              top: "35px",
              fontSize: "17px",
            }}
            className="icon_search"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>

      <h2 style={{ textAlign: "left" }}>عدد الشركات :{result}</h2>
      {company.map((com) => (
        <div className="Get_company_cart" key={com._id}>
          <div className="user_company">
            <img
              src={
                com.user && com.user.profilImage
                  ? `https://${com.user.profilImage}`
                  : user_img
              }
            />
            <span>
              <p>{com.user?.name || "Unknown"}</p>
              <p>{com.user?.email || "Unknown"}</p>
            </span>
          </div>
          <div className="img_company" onClick={() => Navigate(`/company_id/${com._id}`)}>
            <img src={`https://${com.logoImage || ""}`} alt="Company Logo" />
            <img src={`https://${com.companyImage || ""}`} alt="Company" />
          </div>
          <div className="text_company">
            <h2>{com.name || "Unnamed Company"}</h2>
            {/* <p>{com.description || "No description available"}</p> */}
            <p>
              رقم الهاتف : <span>{com.phone || "N/A"}</span>
            </p>
            <p>
              عدد المقيمين : <span>{com.ratingsQuantity || "0"}</span>
            </p>
            <p>
              الفئة : <span>{com.categorey?.name || "لا يوجد فئة"}</span>
            </p>
            <p>
              {" "}
              <span>{com.email ? com.email : "لا يوجد ايميل"}</span> :بريد
              الكتروني{" "}
            </p>
            <p>
              البلد : <span>{com.Country ? com.Country : "لا يوجد بلد"}</span>
            </p>
            <p>
              مدينة : <span>{com.Country ? com.city : "لا يوجد مدينة"}</span>
            </p>
            <p>
              شارع : <span>{com.Country ? com.street : "لا يوجد شارع"}</span>
            </p>
            <StarRating rating={com.ratingsAverage || 0} />
          </div>
          <div className="type">
            <p>نوع الاشتراك : {com.subscription.type}</p>
            <p>
              تاريخ الاشتراك :{" "}
              {format(new Date(com.subscription.startDate), "dd/MM/yyyy")}
            </p>
            <p>
              تاريخ الانت :{" "}
              {format(new Date(com.subscription.endDate), "dd/MM/yyyy")}
            </p>
          </div>
          <div className="icon_company">
            <FontAwesomeIcon
              onClick={() => Navigate(`/admin/update_company/${com._id}`)}
              icon={faPenToSquare}
            />
            <FontAwesomeIcon
              onClick={() => open_delete(com._id)}
              icon={faTrashCan}
            />
          </div>
        </div>
      ))}
      <button
        style={{ display: none_All }}
        onClick={() => setlimit(limit + 40)}
        className="button"
      >
        المزيد من الشركات
      </button>
    </div>
  );
}
