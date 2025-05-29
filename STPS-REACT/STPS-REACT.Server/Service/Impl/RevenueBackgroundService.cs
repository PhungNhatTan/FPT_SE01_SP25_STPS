using STPS_REACT.Server.Service;

namespace STPS_REACT.Server.Service
{
    public class RevenueBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<RevenueBackgroundService> _logger;
        private readonly TimeSpan _period = TimeSpan.FromHours(1); // Check every hour

        public RevenueBackgroundService(IServiceProvider serviceProvider, ILogger<RevenueBackgroundService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessRevenueTransfers();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while processing revenue transfers");
                }

                await Task.Delay(_period, stoppingToken);
            }
        }

        private async Task ProcessRevenueTransfers()
        {
            using var scope = _serviceProvider.CreateScope();
            var revenueService = scope.ServiceProvider.GetRequiredService<IRevenueService>();
            
            _logger.LogInformation("Starting scheduled revenue transfer process");
            await revenueService.ProcessScheduledRevenueTransfers();
            _logger.LogInformation("Completed scheduled revenue transfer process");
        }
    }
}
