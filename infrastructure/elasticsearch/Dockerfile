FROM elasticsearch:7.6.0

# В Win Powershell один раз: wsl -d docker-desktop Затем: echo 262144 >> /proc/sys/vm/max_map_count
RUN echo vm.max_map_count=262144 > /etc/sysctl.d/max_map_count.conf

# Plugins
RUN bin/elasticsearch-plugin install --batch -v https://github.com/fooger/elasticsearch-analysis-morphology/raw/master/analysis-morphology-7.6.0.zip
