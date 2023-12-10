import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAction } from "../redux/actions/categoryActions";
import Select from "react-select";
import { CircularProgress } from "@mui/material";

const CategoryDropdown = (props) => {
  const dispatch = useDispatch();
  const { categoryList, loading, error } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const options = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  const handleChange = (value) => {
    props.onChange("category", value);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };

  return (
    <div className="my-2">
      {loading ? (
        <h2>
          <CircularProgress size="40px" />
        </h2>
      ) : error ? (
        <h1 className="text-red-500">{error}</h1>
      ) : (
        <Select
          id="category"
          value={props.value?.label}
          onChange={handleChange}
          onBlur={handleBlur}
          options={options}
        />
      )}
      {props.error && <h2 className="mt-2 text-red-500">{props.error}</h2>}
    </div>
  );
};

export default CategoryDropdown;
