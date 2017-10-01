using Microsoft.AspNetCore.Mvc;
using Moq;
using Moq.Language;
using Moq.Language.Flow;
using ReadableApi.Controllers;
using ReadableApi.Models;
using ReadableApi.Models.Data;
using ReadableApi.Models.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Xunit;
using System.Linq;

namespace ReadableApi.Test
{
    public class RetrievesPosts
    {
        [Fact]
        public void GettingAllPosts_WithPostsInDatabase_ReturnsAllPosts()
        {
            // Arrange
            var posts = PostsFactory();
            var mockDbReader = new Mock<IDbReader<InMemoryPost>>();
            mockDbReader
                .Setup(reader => reader.All())
                .Returns(posts);
            var controller = ControllerFactory(mockDbReader.Object);

            // Act
            var result = controller.GetAll() as OkObjectResult;

            // Assert
            Assert.Equal(posts, result.Value);
        }

        [Fact]
        public void GettingPostByID_WithNonExistingID_ReturnsNotFound()
        {
            // Arrange
            ulong id = 5;
            var mockDbReader = new Mock<IDbReader<InMemoryPost>>();
            mockDbReader.Setup(reader => 
                reader.ById(id)).Returns((InMemoryPost)null);
            var controller = ControllerFactory(mockDbReader.Object);

            // Act
            var result = controller.GetById(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }


        [Fact]
        public void GettingPostByID_WithExistingID_ReturnsPost()
        {
            // Arrange
            ulong id = 5;
            var post = new InMemoryPost { Id = id };
            var mockDbReader = new Mock<IDbReader<InMemoryPost>>();
            mockDbReader.Setup(reader =>
                reader.ById(id)).Returns(post);
            var controller = ControllerFactory(mockDbReader.Object);

            // Act
            var result = controller.GetById(id) as OkObjectResult;

            // Assert
            Assert.Equal(post, result.Value);
        }

        private PostsController ControllerFactory(IDbReader<InMemoryPost> mockDbReader)
        {
            var mockPersister = new Mock<IPersister>();
            var repository = new Repository<InMemoryPost, PersistentPost>(
                mockPersister.Object, mockDbReader);

            return new PostsController(repository);
        }

        private IEnumerable<InMemoryPost> PostsFactory()
        {
            return new InMemoryPost[]
            {
                new InMemoryPost
                {
                    Author = "Gandalf",
                    Title = "A book",
                    Body = "Tons of text",
                    Category = "Crime",
                    Deleted = false,
                    VoteScore = 0,
                    Id = 4,
                    Timestamp = new DateTime(2017, 11, 20)
                },
                new InMemoryPost
                {
                    Author = "Sam",
                    Title = "No way",
                    Body = "Tons of letters",
                    Category = "Romance",
                    Deleted = false,
                    VoteScore = 2,
                    Id = 5,
                    Timestamp = new DateTime(2016, 11, 20)
                }
            };
        }
    }
}
