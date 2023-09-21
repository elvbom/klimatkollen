/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components'

import { H1, H2, ParagraphBold } from '../Typography'
import BackArrow from '../BackArrow'
import PageWrapper from '../PageWrapper'
import DropDown from '../DropDown'
import ScoreCard from './ScoreCard'
import { devices } from '../../utils/devices'
import { Municipality as TMunicipality } from '../../utils/types'
import MunicipalitySolutions from './MunicipalitySolutions'
import MunicipalityEmissionGraph from './MunicipalityEmissionGraph'
import MunicipalityEmissionNumbers from './MunicipalityEmissionNumbers'

const Container = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  background: ${({ theme }) => theme.lightBlack}
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 48px;
`

const CoatOfArmsImage = styled.img`
  width: 60px;
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media only screen and (${devices.tablet}) {
    // flex-direction: row-reverse;
  }
`

const DropDownSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;

  @media only screen and (${devices.tablet}) {
    margin-top: 50px;
    text-align: center;
    align-items: center;
    padding-right: 60px;
  }
`

const StyledH2 = styled(H2)`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 100%;
`

type Props = {
  municipality: TMunicipality
  step: number
  onNextStep: (() => void) | undefined
  onPreviousStep: (() => void) | undefined
  coatOfArmsImage: string | null
  municipalitiesName: Array<string>
}

function Municipality(props: Props) {
  const {
    step,
    municipality,
    onNextStep,
    onPreviousStep,
    coatOfArmsImage,
    municipalitiesName,
  } = props

  return (
    <Container>
      <PageWrapper backgroundColor="lightBlack">
        <BackArrow route="/" />
        <StyledContainer>
          <HeaderSection>
            <H1>{municipality.Name}</H1>
            {coatOfArmsImage && (
              <CoatOfArmsImage
                src={coatOfArmsImage}
                alt={`Kommunvapen för ${municipality.Name}`}
              />
            )}
          </HeaderSection>
          <MunicipalityEmissionGraph
            municipality={municipality}
            step={step}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
          />
          <MunicipalityEmissionNumbers municipality={municipality} step={step} />
        </StyledContainer>
        <MunicipalitySolutions municipality={municipality} />
      </PageWrapper>
      <PageWrapper backgroundColor="lightBlack">
        <StyledH2>
          <H2>
            Fakta om
            {' '}
            {municipality.Name}
          </H2>
        </StyledH2>
        <Bottom>
          <ScoreCard
            name={municipality.Name}
            rank={municipality.HistoricalEmission.AverageEmissionChangeRank}
            budget={municipality.Budget.CO2Equivalent}
            budgetRunsOut={municipality.BudgetRunsOut}
            emissionChangePercent={municipality.EmissionChangePercent}
            politicalRule={municipality.PoliticalRule}
            climatePlan={municipality.ClimatePlan}
          />
        </Bottom>
        <DropDownSection>
          <ParagraphBold>Hur ser det ut i andra kommuner?</ParagraphBold>
          <DropDown
            className="municipality-page"
            municipalitiesName={municipalitiesName}
            placeholder="Välj kommun"
          />
        </DropDownSection>
      </PageWrapper>
    </Container>
  )
}

export default Municipality
