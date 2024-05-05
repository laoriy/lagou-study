import React, { useEffect, FC } from "react";
import { List, Typography, Checkbox as AntdCheckbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useCategoryStore } from "../../store/category";

const { Title } = Typography;

interface Props {
  handleFilter: (arg: string[]) => void;
}

const Checkbox: FC<Props> = ({ handleFilter }) => {
  const getCategories = useCategoryStore((state) => state.getCategories);
  const categories = useCategoryStore((state) => state.result);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onChange = (checkedValue: CheckboxValueType[]) => {
    handleFilter(checkedValue as string[]);
  };

  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <AntdCheckbox.Group
        className="checkBoxFilter"
        options={categories.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
        onChange={onChange}
      />
    </>
  );
};

export default Checkbox;
