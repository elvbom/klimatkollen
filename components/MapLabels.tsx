import styled from 'styled-components'
import { devices } from '../utils/devices'

import Icon from './../public/icons/arrow.svg'
import { Paragraph } from './Typography'


const Container = styled.div`
  padding-left: 0.87rem;
  padding-top: 1.2rem;
  padding-bottom: 0.5rem;
  @media only screen and (${devices.tablet}) {
    position: absolute;
    left: 0;
    top: 0;
  }
`

const LabelBox = styled.div`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-child div {
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }
  &:last-child div {
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
  }
`

const Square = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  position: relative;
`

const ArrowIcon = styled(Icon) <{ rotateup?: boolean }>`
  position: absolute;
  z-index: 1;
  margin: auto;
  left: 0;
  ${(props) => props.rotateup && 'transform: rotate(-90deg)'};
  right: 0;
  top: 0;
  bottom: 0;
`

const StyledParagraph = styled(Paragraph)`
  z-index: 1;
  width: 5em;
  font-size: 0.7em;
  margin: 0;
  line-height: 0;

  @media only screen and (${devices.tablet}) {
    font-size: 0.9em;
  }
`

type LabelProps = {
  color: string
  text: string
  rotateup?: boolean
}

const Label = ({ color, text, rotateup = true }: LabelProps) => {
  return (
    <LabelBox>
      <Square color={color}>
        <ArrowIcon rotateup={rotateup} />
      </Square>
      <StyledParagraph>
        {text}
      </StyledParagraph>
    </LabelBox>
  )
}

const labelColors = ['#EF3054', '#EF5E30', '#EF7F17', '#EF9917', '#EFBF17', '#91BFC8']

type MapLabelsProps = {
  labels: string[]
  rotations: boolean[]
}

const MapLabels = ({ labels, rotations }: MapLabelsProps) => {
  return (
    <Container>
      {labels.map((label, i) => (
        <Label key={i} color={labelColors[i]} text={label} rotateup={rotations[i]} />
      ))}
    </Container>
  )
}

export default MapLabels