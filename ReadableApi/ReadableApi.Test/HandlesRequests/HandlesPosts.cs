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
    public class HandlesPosts
    {
        private Mock<IDbReader<InMemoryPost>> MockReader => 
            new Mock<IDbReader<InMemoryPost>>();

        private Mock<IDbWriter<PersistentPost, InMemoryPost>> MockWriter => 
            new Mock<IDbWriter<PersistentPost, InMemoryPost>>();

        [Fact]
        public void GettingAllPosts_WithPostsInDatabase_ReturnsAllPosts()
        {
            // Arrange
            var posts = PostsFactory();
            var mockReader = MockReader;
            mockReader
                .Setup(reader => reader.All())
                .Returns(posts);
            var controller = ControllerFactory(mockReader, MockWriter);

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
            var mockReader = MockReader;
            mockReader.Setup(reader => 
                reader.ById(id)).Returns((InMemoryPost)null);
            var controller = ControllerFactory(mockReader, MockWriter);

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
            var mockReader = MockReader;
            mockReader.Setup(reader =>
                reader.ById(id)).Returns(post);
            var controller = ControllerFactory(mockReader, MockWriter);

            // Act
            var result = controller.GetById(id) as OkObjectResult;

            // Assert
            Assert.Equal(post, result.Value);
        }


        [Fact]
        public void CreatingPost_WithNullAsBody_ReturnsBadRequest()
        {
            // Arrange
            var controller = ControllerFactory(MockReader, MockWriter);

            // Act
            var result = controller.Create(null);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void CreatingPost_WithCompleteBody_IsPersisted()
        {
            // Arrange
            var mockWriter = MockWriter;
            var controller = ControllerFactory(MockReader, mockWriter);
            var post = PostsFactory().First();

            // Act
            var result = controller.Create(post);

            // Assert
            mockWriter.Verify(p => p.Write(post), Times.Once);
            Assert.IsType<CreatedAtRouteResult>(result);
        }


        [Fact]
        public void UpdatingPost_WithNullAsBody_ReturnsBadRequest()
        {
            // Arrange
            var controller = ControllerFactory(MockReader, MockWriter);

            // Act
            var result = controller.Update(post: null, id: 5);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }


        [Fact]
        public void UpdatingPost_ThatIsNonExistent_ReturnsNotFound()
        {
            // Arrange
            ulong id = 6;
            var post = PostsFactory().First();
            var mockReader = MockReader;
            mockReader.Setup(reader => reader.ById(5)).Returns((InMemoryPost)null);
            var controller = ControllerFactory(mockReader, MockWriter);

            // Act
            var result = controller.Update(post, id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }


        [Fact]
        public void UpdatingPost_WithCorrectBodyAndID_IsPersisted()
        {
            // Arrange
            ulong id = 5;
            var post = PostsFactory().First();
            var mockWriter = MockWriter;
            var mockReader = MockReader;
            mockReader.Setup(reader => reader.ById(id)).Returns(post);
            var controller = ControllerFactory(mockReader, mockWriter);

            // Act
            var result = controller.Update(post, id: 5);

            // Assert
            mockWriter.Verify(p => p.Write(post, id), Times.Once);
            Assert.IsType<NoContentResult>(result);
        }

        private PostsController ControllerFactory(
            Mock<IDbReader<InMemoryPost>> mockReader,
            Mock<IDbWriter<PersistentPost, InMemoryPost>> mockWriter)
        {
            var repository = new Repository<InMemoryPost, PersistentPost>(
                mockWriter.Object, mockReader.Object);

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
