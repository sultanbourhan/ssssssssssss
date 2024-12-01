import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./About.css";

import Axios from "axios";

import img_plan1 from "../../image/sssss.jpg";

import Loading from "../Loading/Loading"; 

export default function About() {
  useEffect(() => {
    const next = document.querySelector(
      ".book .book_box .page2 .back_p span:nth-child(4)"
    );
    const prve = document.querySelector(
      ".book .book_box .page2 .front_p span:nth-child(3)"
    );
    const page4_5 = document.querySelector(".book .book_box .page2");

    if (next) {
      next.onclick = () => {
        page4_5.style.zIndex = 1;
        page4_5.style.transform = "rotateY(0deg)";
      };
    }

    if (prve) {
      prve.onclick = () => {
        page4_5.style.transform = "rotateY(180deg)";
      };
    }

    const next1 = document.querySelector(
      ".book .book_box .page3 .back_p span:nth-child(3)"
    );
    const prve1 = document.querySelector(
      ".book .book_box .page3 .front_p span:nth-child(3)"
    );
    const page2_4 = document.querySelector(".book .book_box .page3");

    if (next1) {
      next1.onclick = () => {
        page2_4.style.transform = "rotateY(0deg)";
      };
    }

    if (prve1) {
      prve1.onclick = () => {
        page2_4.style.transform = "rotateY(180deg)";
        page4_5.style.zIndex = 0;
      };
    }
  }, []);

  // ==================================================================================

  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const [emailerr, setemailerr] = useState("");
  const [subjecterr, setsubjecterr] = useState("");
  const [messageerr, setmessageerr] = useState("");

  const [reset, setreset] = useState("");

  const resetEmail = () => {
    Axios.post(
      `https://b2you.net/api/v2/auth/receiveAndSendEmailMe`,
      {
        email,
        subject,
        message,
      }
    )
      .then((res) => {
        console.log(res.data.message);

        setemailerr("");
        setsubjecterr("");
        setmessageerr("");

        setemail("");
        setsubject("");
        setmessage("");

        if (res.data.message) {
          setreset(res.data.message);
        }
      })
      .catch((error) => {
        setemailerr("");
        setsubjecterr("");
        setmessageerr("");

        console.error("Error fetching data", error.response.data.errors);
        const err = error.response.data.errors;
        err.map((er) => {
          if (er.path === "email") {
            // setemailerr(er.msg)

            const e_error = err.filter((e) => e.path === "email");
            setemailerr(e_error[0].msg);
          }
          if (er.path === "subject") {
            setsubjecterr(er.msg);
          }
          if (er.path === "message") {
            setmessageerr(er.msg);
          }
        });
      });
  };

  // ==================================================================================

  return (
    <div className="About">
      <div className="container">
        <div className="book">
          <div className="book_box">
            <div className="page1">
              <h1>
                نحن شركة - الريادة والابتكار في تقديم الحلول التجارية المتكاملة
                لتلبية احتياجاتك اليومية
              </h1>
              <img src={img_plan1} alt="" />
              <p>
                نحن ، شركة متخصصة في تقديم الحلول التجارية والابتكارية. لتيسير
                العمليات التجارية لعملائنا ومساعدتهم على تحقيق النجاح. رؤيتنا هي
                أن نكون الشريك الأفضل لكل الأعمال التجارية، ورسالتنا هي تقديم
                خدمات استثنائية ترتكز على الاحترافية والإبداع. لدينا مكاتب
                رئيسية حيث نقوم بإدارة جميع عملياتنا وتقديم الدعم اللازم
                لعملائنا.
              </p>
              <span>1</span>
            </div>
            <div className="page4">
              <div className="subscribe">
                {reset !== "" ? <p>{reset}</p> : null}
                <h2>تواصل معنا</h2>
                <div>
                  <p>{emailerr}</p>
                  <input
                    placeholder="بريدك الالكتروني"
                    className="subscribe-input"
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div>
                  <p>{subjecterr}</p>
                  <input
                    placeholder="عنوان الرسالة"
                    className="subscribe-input"
                    type="text"
                    value={subject}
                    onChange={(e) => setsubject(e.target.value)}
                  />
                </div>
                <div>
                  <p>{messageerr}</p>
                  <textarea
                    placeholder="وصف"
                    className="subscribe-input"
                    type="text"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                  />
                </div>
                <div className="submit-btn" onClick={resetEmail}>
                  ارسال
                </div>
              </div>
              <span>6</span>
            </div>
            <div className="page2">
              <div className="front_p">
                <div className="contact">
                  <div className="contactdes">
                    <h1>اتصل بنا:</h1>
                    <p>
                      نحن هنا لمساعدتك! إذا كانت لديك أي أسئلة أو تعليقات أو كنت
                      بحاجة إلى مساعدة بشأن خدماتنا، فلا تتردد في التواصل معنا.
                    </p>
                  </div>
                  <div className="contacticon">
                    <div className="icons localicon">
                      <div className="ic">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faLocationDot}
                        />
                      </div>
                      <span>Damascus, Syria</span>
                    </div>
                    <div className="icons">
                      <div className="ic">
                        <FontAwesomeIcon className="icon" icon={faPhone} />
                      </div>
                      <span>093479264</span>
                    </div>
                    <div className="icons">
                      <div className="ic">
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                      </div>
                      <span>b2u2424@gmail.com</span>
                    </div>
                  </div>
                  <div className="contactdes">
                    <h1>نموذج الاتصال:</h1>
                    <p>
                      يمكنك أيضًا ملء النموذج وسنقوم بالرد عليك في أقرب وقت
                      ممكن.
                    </p>
                    <p style={{ paddingTop: "10px" }}>
                      إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا!فنحن
                      هنا لمساعدتك بكل سرور! 🌟
                    </p>
                  </div>
                </div>
                <span>5</span>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
              <div className="back_p">
                <h2>خدماتنا الرقمية المتكاملة</h2>
                <div>
                  <div>
                    <h3>إدراج الشركات في الدليل</h3>
                    <p>
                      نسهل على الشركات الصغيرة والكبيرة إدراج بياناتها في دليلنا
                      التجاري ليسهل على العملاء العثور عليها والتواصل معها.
                    </p>
                  </div>
                  <div>
                    <h3>تحسين ظهور الشركات</h3>
                    <p>
                      قدم خدمات لتحسين ظهور الشركات المدرجة في نتائج البحث
                      المحلي لزيادة فرص الوصول إليها من قبل العملاء المحتملين.
                    </p>
                  </div>
                  <div>
                    <h3>إعلانات مستهدفة</h3>
                    <p>
                      نوفر حملات إعلانية مخصصة لزيادة الوعي بالعلامة التجارية
                      وجذب المزيد من العملاء. نستخدم البيانات والتحليلات لتحديد
                      أفضل الفئات المستهدفة وضمان تحقيق أعلى عائد على الاستثمار.
                    </p>
                  </div>
                  <div>
                    <h3>تقييمات ومراجعات العملاء</h3>
                    <p>
                      نساعد الشركات في جمع وعرض التقييمات والمراجعات من العملاء
                      لزيادة الثقة وبناء سمعة قوية على الإنترنت.
                    </p>
                  </div>
                  <div>
                    <h3>إحصائيات وتقارير الأعمال</h3>
                    <p>
                      نوفر تقارير وإحصائيات مفصلة حول أداء الشركات والإعلانات،
                      مما يساعد العملاء على اتخاذ قرارات مستنيرة وتحسين
                      استراتيجياتهم.
                    </p>
                  </div>
                  <div>
                    <h3>إنشاء مواقع الويب</h3>
                    <p>
                      نحن متخصصون في تصميم وتطوير مواقع ويب مبتكرة ومتجاوبة تلبي
                      احتياجات عملك وتزيد من تواجدك الرقمي. سواء كنت تحتاج إلى
                      موقع إلكتروني بسيط أو منصة تجارة إلكترونية متكاملة، فريقنا
                      لديه الخبرة والمهارات لتحقيق رؤيتك.
                    </p>
                  </div>
                </div>
                <span>4</span>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
            <div className="page3">
              <div className="front_p">
                <div>
                  <h1>قيمنا</h1>
                  <p>قيمنا هي جوهر كل ما نقوم به. نحن نؤمن ب</p>
                  <div>
                    <p>
                      <span>النزاهة: </span>
                      نلتزم بأعلى معايير الأخلاق في جميع تعاملاتنا. نؤمن أن
                      الصدق والشفافية هما الأساس لعلاقات طويلة الأمد مع عملائنا
                      وشركائنا
                    </p>
                    <p>
                      <span>الابتكار: </span>
                      نسعى دائمًا إلى تطوير حلول جديدة وفريدة من نوعها. نحن
                      ملتزمون بالبحث المستمر والتطوير لتقديم أفضل الحلول التي
                      تلبي احتياجات عملائنا وتفوق توقعاتهم
                    </p>
                    <p>
                      <span>العمل الجماعي: </span>
                      نعمل معًا كفريق لتحقيق أهدافنا المشتركة. نقدر التعاون
                      ونؤمن أن النجاح يتحقق عندما ندمج جهودنا وخبراتنا للوصول
                      إلى حلول مبتكرة وفعالة.
                    </p>
                    <p>
                      <span> التفاني في العمل: </span>
                      نقدم أفضل ما لدينا في كل خدمة نوفرها. نحن ملتزمون بتقديم
                      أعلى مستويات الجودة والاهتمام بالتفاصيل، مما يضمن رضا
                      عملائنا وتلبية احتياجاتهم بأفضل شكل ممكن
                    </p>
                    <p>
                      <span>الاحترام: </span>
                      ؤمن بأهمية الاحترام المتبادل بين جميع أعضاء الفريق
                      والعملاء. الاحترام هو أساس بناء بيئة عمل صحية وإيجابية
                      تسهم في تحقيق النجاح المشترك
                    </p>
                    <p>
                      <span>الاستدامة: </span>
                      نحن ملتزمون بالمسؤولية الاجتماعية والبيئية في جميع جوانب
                      عملنا. نسعى جاهدين لتبني ممارسات مستدامة تحافظ على البيئة
                      وتدعم المجتمع.
                    </p>
                  </div>
                </div>
                <span>3</span>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
              <div className="back_p">
                <div className="box">
                  <h1>خدماتنا</h1>
                  <div>
                    <p>الإعلانات المخصصة</p>
                    <p>
                      نمنح الشركات القدرة على إنشاء ونشر إعلانات مخصصة تستهدف
                      جمهورهم المستهدف. يمكنهم الاختيار من بين أنواع متعددة من
                      الإعلانات مثل إعلانات المنتجات، الخدمات، العروض الترويجية،
                      والخصومات، مما يزيد من رؤية وتفاعل العملاء مع علامتهم
                      التجارية.
                    </p>
                  </div>
                  <div>
                    <p>التقييمات والتعليقات</p>
                    <p>
                      يمكن للعملاء تقييم الشركات وكتابة التعليقات حول خدماتهم
                      ومنتجاتهم. تساعد هذه الميزة في بناء الثقة بين العملاء
                      والشركات وتتيح للشركات تحسين خدماتها بناءً على ملاحظات
                      العملاء.
                    </p>
                  </div>
                  <div>
                    <p>التسجيل وإدارة الحسابات</p>
                    <p>
                      يمكن للشركات بسهولة التسجيل على منصتنا وإنشاء حسابات إدارة
                      شاملة. يمكنهم تحديث معلوماتهم وإضافة تفاصيل الاتصال والصور
                      والشعارات الخاصة بهم، بالإضافة إلى تحديث العروض والخدمات
                      المقدمة بشكل دوري.
                    </p>
                  </div>
                  <div>
                    <p>الدعم الفني والاستشارات</p>
                    <p>
                      نقدم للشركات دعمًا فنيًا شاملاً واستشارات مخصصة لتحسين
                      تواجدهم الرقمي. سواء كنت تحتاج إلى مساعدة في تحسين موقعك
                      الإلكتروني، أو استراتيجيات التسويق الرقمي، فريقنا من
                      الخبراء مستعد دائمًا لتقديم الإرشادات اللازمة.
                    </p>
                  </div>
                </div>
                <span>2</span>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
