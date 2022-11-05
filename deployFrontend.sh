git pull
cd frontend
docker build . -t frontend
docker tag frontend gcr.io/peerprep-367615/frontend
docker push gcr.io/peerprep-367615/frontend