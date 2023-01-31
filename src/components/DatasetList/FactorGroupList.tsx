import { sortArrayOfObjectsByName } from '../../utils/sortTools';
import { yyyymmddToDate } from '../../utils/dateTools';
import { useState, useEffect} from 'react';

const FactorGroupDetailModal = (props: any) => {
  const getTable = (d: any) => {
    const rows = d.labels.map((e: any, i: any) => {
      return {label: e, range: d.quantiles[i+1]}
    })
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>표기명</th>
            <th>누적분위</th>
          </tr>
        </thead>
        <tbody>
        {
          rows.map((r: any, i: any) => (
            <tr key={i}>
              <td>{r.label}</td>
              <td>{r.range * 100}%</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }
  return (
    <div className='modal fade' id='factors'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <strong className='modal-title'>구성기준 {props.groupData.name.split(/(?=[A-Z])/).join(' ')} 상세</strong>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            {
              props.groupData.factors.map((d: any, i: any) => (
                <div key={i} className='mb-3'>
                  <strong className='mb-3'>요인 {i+1}</strong>
                  <ul>
                    <li>클래스명 (고유번호): {d.variable.address.model_name} ({d.variable.address.id})</li>
                    <li>요인명 (영문): {d.variable.label_en}</li>
                    <li>요인명 (한글): {d.variable.label_kr}</li>
                    <li>구성기준값: 구성기준일로부터 {d.lookback}개월 전 값</li>
                    <li>분위정보</li>
                    {getTable(d)}
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export const FactorGroupList = (props: any) => {
  const [groupId, setGroupId] = useState<any>(7);
  const [groupData, setGroupData] = useState<any>(undefined);
  useEffect(() => {
    var data = props.dataList.find((data: any) => data.address.group_id === groupId);
    setGroupData(data);
  }, [groupId])
  return (
    <>
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>고유번호</th>
          <th>구성기준명</th>
          <th>구성기준 상세</th>
          <th>최근 구성 기준일</th>
          <th>재조정 주기 (개월)</th>
          <th>다운로드</th>
        </tr>
      </thead>
      <tbody>
        {
          props.dataList
            .sort(sortArrayOfObjectsByName)
            .map((d: any, i: any) => (
            <tr key={i}>
              <td>{d.address.group_id}</td>
              <td>{d.name.split(/(?=[A-Z])/).join(' ')}</td>
              <td>
                <button
                  onClick={() => setGroupId(d.address.group_id)}
                  className='btn btn-link m-0 p-0'
                  data-bs-toggle='modal'
                  data-bs-target='#factors'
                ><i className='bi bi-file-text'/></button>
              </td>
              <td>{yyyymmddToDate(d.last_rebalance).toISOString().slice(0, 10)}</td>
              <td>{d.rebalancing_frequency}</td>
              <td><a href={d.download_url}><i className='bi bi-download'/></a></td>
            </tr>
          ))
        }
      </tbody>
    </table>
    {
      groupData && (
        <FactorGroupDetailModal groupData={groupData}/>
      )
    }
    </>
  )
}
