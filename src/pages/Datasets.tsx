import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';
import { DatasetList } from '../components/DatasetList';

const Datasets = () => {
  const [varList, setVarList] = useState<any>(undefined)
  useEffect(() => {
    fetchData('variable/list')
      .then(data => setVarList(data))
  }, []);
  const [fgList, setFgList] = useState<any>(undefined)
  useEffect(() => {
    fetchData('factor-group/list')
      .then(data => setFgList(data))
  }, []);
  return (
    <div className='container py-3'>
      <div id='variableList'>
      {
        varList && (
          <DatasetList
            dataListClass='variable'
            title='주요 지표별 패널 데이터'
            desc='공공데이터로부터 산출된 주요지표의 기업별 월별 (분기별) 패널 데이터입니다.'
            warning0="지표 산출에 활용된 모든 재무제표 데이터는 'OPENDART 재무정보 일괄 다운로드 서비스'로부터 제공받은 데이터를 연율화(누적 1년)한 데이터입니다."
            warning1='OPENDART에 명시된 바와 같이, 재무제표는 공시의무자인 제출인의 책임하에 작성되었으며, 금융감독원이 이 정보의 정확성 및 완전성을 보장하는 것은 아닙니다.'
            warning2='또한, 기준일자 이후로 제출인이 재무제표를 정정할 경우 수치가 변경될 수 있습니다.'
            warning3="지표 산출에 활용된 모든 가격 및 시가총액 데이터는 '공공데이터포털 금융위원회 주식시세정보'로부터 제공받은 데이터입니다."
            dataList={varList.data}
          />
        )
      }
      </div>
      <div id='factorGroupList'>
      {
        fgList && (
          <DatasetList
            dataListClass='factor-group'
            title='요인 포트폴리오별 수익률 데이터'
            desc='주요 지표별 패널 데이터를 바탕으로 구성한 요인 포트폴리오의 백테스트 결과 데이터입니다. 2022년 12월 29일부터 현재까지 결과를 기록 중 입니다.'
            warning0='모든 요인 포트폴리오는 주요 지표별 패널 데이터를 원천으로 구성되었으며, 이에 주요 지표별 패널 데이터의 유의사항을 공유합니다.'
            dataList={fgList.data}
          />
        )
      }
      </div>
    </div>
  )
}

export default Datasets
