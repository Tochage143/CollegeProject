import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Apiurl } from "../Data/ApiData";
import { useThemeContext } from "../ContextApi/ThemeContext";

const Course = () => {
  const { id } = useParams();
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { darkMode } = useThemeContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${Apiurl}course/${id}`);
        console.log(response);
        if (response.status === 200) {
          setCoursesData(response.data);
          setLoading(false);
          Showimg();
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    }
    fetchData();
  }, [id]);
  function Showimg() {
    const lazyImages = document.querySelectorAll("img.clgdn_lazyload");
    lazyImages.forEach((lazyImage) => {
      const src = lazyImage.getAttribute("data-src");
      lazyImage.setAttribute("src", src);
      lazyImage.classList.remove("clgdn_lazyload");
    });
  }
  return (
    <div>
      <div className="container mx-auto px-4 py-8 mt-10 lg:w-[1300px]  md:w-[786px] sm:w-[640px]">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data.</p>}
        {coursesData && (
          <div>
            {/* css add kraychi baki ahe  */}
            <div className="w-screen p-5">
              <h1 className="font-bold text-3xl">
                {coursesData.course_data.course_tag}
              </h1>
            </div>
            <div className={`${darkMode ? "Dark" : "Light"}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(coursesData?.article?.description),
                }}
                className="cdcms_college_highlights"
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const sanitizeHTML = (htmlString) => {
  // Remove all <a> tags with href containing "zollege.in"
  htmlString = htmlString.replace(
    /<a[^>]*href\s*=\s*["'][^"']*zollege\.in[^"']*["'][^>]*>/gi,
    ""
  );
  htmlString = htmlString.replace(/<iframe.*?<\/iframe>/gi, "");
  htmlString = htmlString.replace(
    /style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;"/gi,
    'style="background:rgb(31, 41, 55); border: 1px solid #ccc; padding: 5px 10px;"'
  );
  return htmlString;
};
export default Course;
