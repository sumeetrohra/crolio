import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getInvestments } from '../../api/investments';
import { getAllPortfolios } from '../../api/portfolio';

const HomePage: React.FC = () => {
  const [availablePortfolios, setAvailablePortfolios] = useState<any[]>();
  const [investmentDetails, setInvestmentDetails] = useState<any>();

  useEffect(() => {
    getAllPortfolios().then((data) => setAvailablePortfolios(data.data.portfolios));
  }, []);

  useEffect(() => {
    getInvestments().then((data) => setInvestmentDetails(data.data));
  }, []);

  const history = useHistory();

  return (
    <Container style={{ marginBottom: '16px' }}>
      {investmentDetails &&
        investmentDetails.investments &&
        Array.isArray(investmentDetails.investments) &&
        investmentDetails.investments.length > 0 && (
          <div
            style={{
              borderBottom: '1px solid #ababab',
              marginBottom: '32px',
              paddingBottom: '48px',
            }}
          >
            <Typography variant="h3" component="h3">
              Investments Overview
            </Typography>
            <div
              style={{
                border: '1px solid #ababab',
                backgroundColor: '#ababab',
                color: '#000',
                borderRadius: '16px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '16px',
                cursor: 'pointer',
              }}
            >
              <Typography variant="h6" component="h6">
                current value
                <br />
                {investmentDetails.investmentStats.totalCurrentValue.toFixed(2)}
              </Typography>
              <Typography variant="h6" component="h6">
                total returns
                <br />
                {investmentDetails.investmentStats.totalReturns.toFixed(2)} (
                {(
                  (investmentDetails.investmentStats.totalReturns * 100) /
                  investmentDetails.investmentStats.moneyPutIn
                ).toFixed(2)}
                )
              </Typography>
              <Typography variant="h6" component="h6">
                current investment
                <br />
                {investmentDetails.investmentStats.totalCurrentInvestment.toFixed(2)}
              </Typography>
              <Typography variant="h6" component="h6">
                current returns
                <br />
                {investmentDetails.investmentStats.currentReturns.toFixed(2)} (
                {(
                  (investmentDetails.investmentStats.currentReturns * 100) /
                  investmentDetails.investmentStats.totalCurrentInvestment
                ).toFixed(2)}
                %)
              </Typography>
              <Typography variant="h6" component="h6">
                realized returns
                <br />
                {investmentDetails.investmentStats.realizedReturns.toFixed(2)}
              </Typography>
              <Typography variant="h6" component="h6">
                money put in
                <br />
                {investmentDetails.investmentStats.moneyPutIn.toFixed(2)}
              </Typography>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridGap: '16px',
                marginTop: '16px',
              }}
            >
              <Typography variant="h3" component="h3">
                Investments
              </Typography>
              {Array.isArray(investmentDetails.investments) &&
                investmentDetails.investments.map((investment: any) => (
                  <div
                    key={investment._id}
                    style={{
                      border: '1px solid #ffeeab',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gridGap: '8px',
                    }}
                  >
                    {Array.isArray(availablePortfolios) && availablePortfolios.length > 0 && (
                      <Typography component="h5" variant="h5">
                        {
                          availablePortfolios.filter(
                            (portfolio) => portfolio._id === investment.portfolioRef,
                          )[0].name
                        }
                      </Typography>
                    )}
                    <Typography component="p">Details</Typography>
                    <table>
                      <thead>
                        <tr>
                          <td>Pair</td>
                          <td>Weight</td>
                          <td>current investment</td>
                          <td>ticker amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        {investment.holdings.map((data: any) => (
                          <tr key={data.pair}>
                            <td>{data.pair}</td>
                            <td>{data.weight} %</td>
                            <td>{data.currentInvestment}</td>
                            <td>{data.tickerAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
        )}
      {Array.isArray(availablePortfolios) && availablePortfolios.length > 0 && (
        <>
          <Typography variant="h3" component="h3">
            Investment Ideas
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '16px',
              marginTop: '16px',
            }}
          >
            {availablePortfolios.map((portfolio) => (
              <div
                key={portfolio._id}
                style={{
                  border: '1px solid #ffeeab',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridGap: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => history.push(`/portfolio/${portfolio._id}`)}
              >
                <Typography component="h5" variant="h5">
                  {portfolio.name}
                </Typography>
                <Typography component="p">{portfolio.description}</Typography>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default HomePage;
