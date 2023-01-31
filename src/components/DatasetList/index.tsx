import { VariableList } from './VariableList';
import { FactorGroupList } from './FactorGroupList';

const listWarnings = (props: any) => {
  const warnings = [] as any[];
  for (let k in props) {
    if (!k.startsWith('warning')) continue;
    warnings.push(props[k])
  }
  return warnings;
}


export const DatasetList = (props:any) => {
  const warnings = listWarnings(props)
  return (
    <div className='data-list mb-5'>
      <h3>{props.title}</h3>
      <p className='text-lead text-muted'>{props.desc}</p>
      {
        warnings.length > 0 && (
          <div className='alert alert-warning mb-3'>
            <strong><i className='bi bi-exclamation-triangle-fill me-2'/>유의사항</strong>
            <hr />
            <ul>
              {
                warnings.map((w: any, i: any) => (
                  <li key={i}>{w}</li>
                ))
              }
            </ul>
          </div>
        )
      }
      <strong className='mb-3'>데이터 목록</strong>
      {
        props.dataListClass === 'variable'
          ? <VariableList dataList={props.dataList}/>
          : (
            props.dataListClass === 'factor-group'
            ? <FactorGroupList dataList={props.dataList} />
            : ''
          )
      }
    </div>
  )
}
