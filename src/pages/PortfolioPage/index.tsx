import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { investMoney } from '../../api/investments';
import { getPortfolioDetails } from '../../api/portfolio';

// Individual Portfolio details lies here
const PortfolioPage: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [portfolioDetails, setPortfolioDetails] = useState<any>();
  const [openInvestModal, setOpenInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [loadingInvest, setLoadingInvest] = useState(false);

  useEffect(() => {
    getPortfolioDetails((params as any).portfolioId)
      .then((data) => {
        setPortfolioDetails(data.data);
        setInvestmentAmount(data.data.minInvestmentAmount);
      })
      .finally(() => setLoading(false));
  }, []);

  const history = useHistory();

  const handleClose = () => !loadingInvest && setOpenInvestModal(false);

  const handleInvest = () => {
    console.log(investmentAmount);
    setLoadingInvest(true);
    // TODO: Invest more
    portfolioDetails.hasInvested
      ? null
      : investMoney({ portfolioId: portfolioDetails._id, amount: investmentAmount }).finally(() => {
          setLoadingInvest(false);
          history.push('/');
        });
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            border: '1px solid #ffeeab',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridGap: '8px',
            cursor: 'pointer',
          }}
        >
          <Typography component="h5" variant="h5">
            {portfolioDetails.name}
          </Typography>
          <Typography component="h6" variant="h6">
            {portfolioDetails.description}
          </Typography>
          <table>
            <thead>
              <tr>
                <td>Pair</td>
                <td>Weight</td>
              </tr>
            </thead>
            <tbody>
              {portfolioDetails.holdings.map((data: any) => (
                <tr key={data.pair}>
                  <td>{data.pair}</td>
                  <td>{data.weight} %</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Typography component="h5" variant="h5">
            Minimum Investment: {portfolioDetails.minInvestmentAmount} inr
          </Typography>
          {portfolioDetails.hasInvested ? (
            <Button
              variant="contained"
              onClick={() => setOpenInvestModal(true)}
              disabled={loadingInvest}
            >
              Invest more
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setOpenInvestModal(true)}
              disabled={loadingInvest}
            >
              Invest now
            </Button>
          )}
          <Dialog open={openInvestModal} onClose={handleClose}>
            <DialogTitle>Invest</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Amount in Inr"
                type="number"
                fullWidth
                variant="standard"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              />
            </DialogContent>
            <DialogActions>
              <Button disabled={loadingInvest} onClick={handleClose}>
                Cancel
              </Button>
              <Button disabled={loadingInvest} onClick={handleInvest}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Container>
  );
};

export default PortfolioPage;
