﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Models;

public partial class StpsContext : DbContext
{
    public StpsContext()
    {
    }

    public StpsContext(DbContextOptions<StpsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<AccountDetail> AccountDetails { get; set; }

    public virtual DbSet<Authentication> Authentications { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<LocationType> LocationTypes { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<PersonalizedTour> PersonalizedTours { get; set; }

    public virtual DbSet<Tctour> Tctours { get; set; }

    public virtual DbSet<Tour> Tours { get; set; }

    public virtual DbSet<TourDetail> TourDetails { get; set; }

    public virtual DbSet<TourFeedback> TourFeedbacks { get; set; }

    public virtual DbSet<TourismCompany> TourismCompanies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-U65F98K;Initial Catalog=STPS;Integrated Security=True;Encrypt=False;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UK_Table_1").IsUnique();

            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountID");
            entity.Property(e => e.AuId).HasColumnName("auID");
            entity.Property(e => e.Password)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Status)
                .HasDefaultValue(true)
                .HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Au).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.AuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Account_Authentication");
        });

        modelBuilder.Entity<AccountDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("AccountDetail");

            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountID");
            entity.Property(e => e.Avatar)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("avatar");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");

            entity.HasOne(d => d.Account).WithMany()
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccountDetail_Account");
        });

        modelBuilder.Entity<Authentication>(entity =>
        {
            entity.ToTable("Authentication");

            entity.Property(e => e.AuthenticationId)
                .ValueGeneratedNever()
                .HasColumnName("authenticationID");
            entity.Property(e => e.AuthenticationName)
                .HasMaxLength(100)
                .HasColumnName("authenticationName");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.ToTable("Blog");

            entity.Property(e => e.BlogId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("blogId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.BlogContent)
                .HasMaxLength(1000)
                .HasColumnName("blogContent");
            entity.Property(e => e.BlogName)
                .HasMaxLength(200)
                .HasColumnName("blogName");

            entity.HasOne(d => d.Account).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Blog_Account");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.ToTable("Location");

            entity.Property(e => e.LocationId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("locationID");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("imgUrl");
            entity.Property(e => e.LocationName)
                .HasMaxLength(100)
                .HasColumnName("locationName");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.TypeId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("typeID");

            entity.HasOne(d => d.Type).WithMany(p => p.Locations)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Location_LocationType");
        });

        modelBuilder.Entity<LocationType>(entity =>
        {
            entity.HasKey(e => e.TypeId);

            entity.ToTable("LocationType");

            entity.Property(e => e.TypeId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("typeID");
            entity.Property(e => e.TypeName)
                .HasMaxLength(100)
                .HasColumnName("typeName");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.Property(e => e.OrderId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("orderID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountID");
            entity.Property(e => e.StartDate).HasColumnName("startDate");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourID");

            entity.HasOne(d => d.Account).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Account");

            entity.HasOne(d => d.Tour).WithMany(p => p.Orders)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Tour");
        });

        modelBuilder.Entity<PersonalizedTour>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PersonalizedTour");

            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourId");

            entity.HasOne(d => d.Account).WithMany()
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonalizedTour_Account");

            entity.HasOne(d => d.Tour).WithMany()
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonalizedTour_Tour");
        });

        modelBuilder.Entity<Tctour>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TCTour");

            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.TcId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tcID");
            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourID");

            entity.HasOne(d => d.Tc).WithMany()
                .HasForeignKey(d => d.TcId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TCTour_TourismCompany");

            entity.HasOne(d => d.Tour).WithMany()
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TCTour_Tour");
        });

        modelBuilder.Entity<Tour>(entity =>
        {
            entity.ToTable("Tour");

            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourID");
            entity.Property(e => e.TourName)
                .HasMaxLength(250)
                .HasColumnName("tourName");
        });

        modelBuilder.Entity<TourDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TourDetail");

            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.LocationId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("locationID");
            entity.Property(e => e.Rollno).HasColumnName("rollno");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourID");

            entity.HasOne(d => d.Location).WithMany()
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourDetail_Location");

            entity.HasOne(d => d.Tour).WithMany()
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourDetail_Tour");
        });

        modelBuilder.Entity<TourFeedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId);

            entity.ToTable("TourFeedback");

            entity.Property(e => e.FeedbackId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("feedbackID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountID");
            entity.Property(e => e.FeedbackDetail)
                .HasMaxLength(500)
                .HasColumnName("feedbackDetail");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.TourId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tourID");

            entity.HasOne(d => d.Account).WithMany(p => p.TourFeedbacks)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourFeedback_Account");

            entity.HasOne(d => d.Tour).WithMany(p => p.TourFeedbacks)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourFeedback_Tour");
        });

        modelBuilder.Entity<TourismCompany>(entity =>
        {
            entity.HasKey(e => e.TcId);

            entity.ToTable("TourismCompany");

            entity.Property(e => e.TcId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("tcID");
            entity.Property(e => e.AccountId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("accountID");
            entity.Property(e => e.TcName)
                .HasMaxLength(200)
                .HasColumnName("tcName");

            entity.HasOne(d => d.Account).WithMany(p => p.TourismCompanies)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourismCompany_Account");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
