namespace LibraryManagementApi.HostedServices
{
    public class LibraryDbSeederHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        public LibraryDbSeederHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<LibraryDbInitializer>();
            if (seeder != null)
            {
                await seeder.SeedAsync();
            }
            await Task.FromResult(0);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
    public class IdentitySeederHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        public IdentitySeederHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<IdentityDbInitializer>();
            if (seeder != null)
            {
                await seeder.SeedAsync();
            }
            await Task.FromResult(0);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
