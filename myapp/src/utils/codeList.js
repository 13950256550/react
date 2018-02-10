import React from 'react';
import { Select } from 'antd';

const codelists = [
  {
    type: 'BAD305',
    datas: [
      { codeKey: '1', codeValue: '养老社发' },
      { codeKey: '2', codeValue: '医疗月结' },
      { codeKey: '3', codeValue: '医疗年结' },
    ],
  },
];

export function getCodeList(codeType) {
  return codelists.find((codelist) => {
    return codelist.type === codeType;
  },
	).datas;
}

export function getCodeObject(codeList, codeKey) {
  return codeList.find((codeObject) => {
    return codeObject.codeKey === codeKey;
  },
	);
}

export function getShowValue(codeType, codeKey) {
  let result = codeKey;
  const codeList = getCodeList(codeType);
  const codeObject = getCodeObject(codeList, codeKey);
  if (codeObject !== null && codeObject !== undefined) {
    result = /* codeObject.codeKey+"-"+*/codeObject.codeValue;
  }
  return result;
}

export function getSelectOptions(codeType) {
  const codeList = getCodeList(codeType);
  return codeList.map(codeObject => <Select.Option key={codeObject.codeKey}>{`${codeObject.codeKey}-${codeObject.codeValue}`}</Select.Option>);
}
