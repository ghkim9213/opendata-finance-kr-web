import { sortArrayOfObjectsByLabelEn } from '../../utils/sortTools';

export const VariableList = (props: any) => {
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>클래스명 (고유번호)</th>
          <th>지표명 (영문)</th>
          <th>지표명 (한글)</th>
          <th>지표 상세</th>
          <th>다운로드</th>
        </tr>
      </thead>
      <tbody>
        {
          props.dataList
            .sort(sortArrayOfObjectsByLabelEn)
            .map((d: any, i: any) => (
            <tr key={i}>
              <td>{d.address.model_name} ({d.address.id})</td>
              <td className="text-capitalize">{d.label_en}</td>
              <td>{d.label_kr}</td>
              <td>
                <button
                  onClick={() => {}}
                  className='btn btn-link m-0 p-0'
                  data-bs-toggle='modal'
                  data-bs-target='#'
                  disabled
                ><i className='bi bi-file-text'/></button>
              </td>
              <td><a href={d.download_url}><i className='bi bi-download'/></a></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
